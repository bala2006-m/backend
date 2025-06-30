import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { GetHolidaysByClassDto } from './dto/holidays.dto';

@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Get('class')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getByClass(@Query() query: GetHolidaysByClassDto) {
    const { school_id, class_id } = query;
    return this.holidaysService.getHolidaysByClass(school_id, class_id);
  }
}
