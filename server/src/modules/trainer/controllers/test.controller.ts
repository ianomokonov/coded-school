import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestService } from '../services/test.service';
import { TestDto } from '../dto/test/test.dto';
import { CheckTestDto } from '../dto/test/check-test.dto';
import { SaveTestDto } from '../dto/test/save-test.dto';

@ApiTags('Trsiner:Test')
@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Get(':id')
  async getTest(@Param('id') id: number): Promise<TestDto> {
    return this.testService.read(id);
  }

  @Get(':id/full')
  async getTestFull(@Param('id') id: number): Promise<TestDto> {
    return this.testService.read(id, true);
  }

  @Post('check')
  async checkTest(
    @Param('id') id: number,
    @Body() body: CheckTestDto,
  ): Promise<boolean> {
    return this.testService.check(body);
  }

  @Post()
  createTest(@Body() body: SaveTestDto) {
    return this.testService.create(body);
  }
  @Put(':id')
  updateTest(@Param('id') id: number, @Body() body: SaveTestDto) {
    return this.testService.update(id, body);
  }
}
