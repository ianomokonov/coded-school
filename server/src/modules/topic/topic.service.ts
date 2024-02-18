import { SaveTopicDto } from '@dtos/topic/save-topic.dto';
import { TopicDto } from '@dtos/topic/topic.dto';
import { TopicEntity } from '@entities/module/topic.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TopicService {
  async create(dto: SaveTopicDto) {
    const { id } = await TopicEntity.create({ ...dto }).save();
    return id;
  }

  async update(id: number, dto: SaveTopicDto) {
    await TopicEntity.update({ id }, { ...dto });
  }

  async delete(id: number) {
    await TopicEntity.delete({ id });
  }

  async read(id: number): Promise<TopicDto> {
    return await TopicEntity.findOne({ where: { id } });
  }
}
