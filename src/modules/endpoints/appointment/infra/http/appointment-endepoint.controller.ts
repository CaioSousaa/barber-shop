import { Body, Controller, Get } from '@nestjs/common';
import { AppointmenteDayDTO } from '../../dto/appointment-in-day-dto';
import { AppointmenteDayService } from '../../services/appointment-in-day.service';

@Controller('endpoint-appointmente')
export class AppointmentEndpointController {
  constructor(private readonly dayService: AppointmenteDayService) {}

  @Get()
  public async getDay(@Body() dayDTO: AppointmenteDayDTO) {
    return this.dayService.execute(dayDTO);
  }
}
