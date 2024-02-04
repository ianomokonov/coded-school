import {
  Controller,
  Post,
  Param,
  UseGuards,
  Body,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ModuleService } from './module.service';
import { UserId } from 'src/decorators/author-id.decorator';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { SaveModuleDto } from './dto/create-module.dto';

@ApiTags('Module')
@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get('all')
  @ApiOperation({ summary: 'Получить список модулей' })
  async getAllModules() {
    return this.moduleService.getAllModules();
  }

  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать модуль' })
  async create(@Body() dto: SaveModuleDto) {
    return this.moduleService.createModule(dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить модуль' })
  async update(@Param('id') id: number, @Body() dto: SaveModuleDto) {
    return this.moduleService.updateModule(id, dto);
  }
  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить модуль' })
  async delete(@Param('id') id: number) {
    return this.moduleService.deleteModule(id);
  }
  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить модуль' })
  async read(@Param('id') id: number) {
    return this.moduleService.readModule(id);
  }
  @Post(':id/start')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Стартовать модуль для текущего пользователя' })
  async startUserModule(@UserId() userId: number, @Param('id') id: number) {
    return this.moduleService.startModule(id, userId);
  }
  @Post(':id/complete')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Завершить модуль для текущего пользователя' })
  async completeUserModule(@UserId() userId: number, @Param('id') id: number) {
    return this.moduleService.completeModule(id, userId);
  }
}
