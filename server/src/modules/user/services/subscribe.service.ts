import { BadRequestException, Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthService } from '../auth.service';
import { SubscribeDto } from '../dto/subscribe.dto';
import { SubscribeModel } from '../models/subscribe.model';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectModel(SubscribeModel)
    private readonly subscribeModel: ModelType<SubscribeModel>,
    private readonly authService: AuthService,
  ) {}

  async subscribe(
    { authorLogin }: SubscribeDto,
    subscriberId: string,
  ): Promise<DocumentType<SubscribeModel>> {
    const author = await this.authService.findUser(authorLogin);
    if (!author) {
      throw new BadRequestException('Такого автора не существует');
    }
    if (await this.findSubscription(subscriberId, author._id.toString())) {
      throw new BadRequestException('Подписка уже оформлена');
    }
    return this.subscribeModel.create({
      subscriberId,
      authorId: author._id.toString(),
    });
  }

  async unsubscribe({ authorLogin }: SubscribeDto, subscriberId: string) {
    const author = await this.authService.findUser(authorLogin);
    if (!author) {
      throw new BadRequestException('Такого автора не существует');
    }
    return this.subscribeModel
      .deleteOne({ subscriberId, authorId: author._id.toString() })
      .exec();
  }

  async findSubscription(subscriberId: string, authorId: string) {
    return this.subscribeModel.findOne({ subscriberId, authorId }).exec();
  }
}
