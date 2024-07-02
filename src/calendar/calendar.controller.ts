import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('calendars')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  createCalendar(@Body() body: { userId: number }) {
    return this.calendarService.createCalendar(body.userId);
  }

  @Post('events')
  addEvent(@Body() body: { userId: number; title: string; date: string }) {
    return this.calendarService.addEvent(body.userId, {
      title: body.title,
      date: body.date,
    });
  }

  @Get('events/:userId')
  getEvents(@Param('userId') userId: number) {
    return this.calendarService.getEvents(userId);
  }

  @Delete('events/:userId/:eventId')
  deleteEvent(
    @Param('userId') userId: number,
    @Param('eventId') eventId: number,
  ) {
    return this.calendarService.deleteEvent(userId, eventId);
  }
}
