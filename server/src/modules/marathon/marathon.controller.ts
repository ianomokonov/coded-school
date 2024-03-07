import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MarathonService } from './marathon.service';
import { UserId } from '@decorators/author-id.decorator';
import { JwtAuthGuard } from '@guards/user/jwt.guard';
import { SaveMarathonDto } from '@dtos/marathon/save-marathon.dto';

@ApiTags('Marathon')
@Controller('marathon')
export class MarathonController {
  constructor(private marathonService: MarathonService) {}
  @Get('all')
  @ApiOperation({ summary: 'Получить список марафонов' })
  async getAllMarathons() {
    return this.marathonService.getAllMarathons();
  }

  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать марафон' })
  async createMarathon(@Body() dto: SaveMarathonDto) {
    return this.marathonService.createMarathon(dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить марафон' })
  async updateUserMarathon(
    @Param('id') id: number,
    @Body() dto: SaveMarathonDto,
  ) {
    return this.marathonService.updateMarathon(id, dto);
  }
  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить марафон' })
  async deleteUserMarathon(@Param('id') id: number) {
    return this.marathonService.deleteMarathon(id);
  }
  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить марафон' })
  async readUserMarathon(@UserId() userId: number, @Param('id') id: number) {
    return this.marathonService.readUserMarathon(id, userId);
  }
  @Put(':id/start')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Стартовать марафон для текущего пользователя' })
  async startUserMarathon(@UserId() userId: number, @Param('id') id: number) {
    return this.marathonService.startMarathon(id, userId);
  }
  @Post(':id/create')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать марафон для текущего пользователя' })
  async createUserMarathon(@UserId() userId: number, @Param('id') id: number) {
    return this.marathonService.createUserMarathon(id, userId);
  }
  @Post(':id/complete')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Завершить марафон для текущего пользователя' })
  async completeUserMarathon(
    @UserId() userId: number,
    @Param('id') id: number,
  ) {
    return this.marathonService.completeMarathon(id, userId);
  }
}
