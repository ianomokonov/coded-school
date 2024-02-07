import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AchievementService } from './achievement.service';
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
import { SaveAchievementDto } from '@dtos/achievment/save-achievement.dto';
import { UserId } from '@decorators/author-id.decorator';
import { JwtAuthGuard } from '@guards/user/jwt.guard';

@ApiTags('Achievement')
@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get('all')
  @ApiOperation({ summary: 'Получить список всех достижений' })
  async getAllAchievements() {
    return this.achievementService.getAllAchievements();
  }

  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать достижение' })
  async createAchievement(@Body() dto: SaveAchievementDto) {
    return this.achievementService.createAchievement(dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить достижение' })
  async updateAchievement(
    @Param('id') id: number,
    @Body() dto: SaveAchievementDto,
  ) {
    return this.achievementService.updateAchievement(id, dto);
  }
  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить достижение' })
  async deleteAchievement(@Param('id') id: number) {
    return this.achievementService.deleteAchievement(id);
  }
  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить достижение' })
  async readAchievement(@Param('id') id: number) {
    return this.achievementService.readAchievement(id);
  }
  @Post(':id/set')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Добавить достижение пользователю' })
  async setUserAchievement(@UserId() userId: number, @Param('id') id: number) {
    return this.achievementService.setUserAchievement(userId, id);
  }
}
