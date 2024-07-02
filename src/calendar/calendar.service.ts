import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarService {
  private calendars = [];

  createCalendar(userId: number) {
    const calendar = { id: Date.now(), userId, events: [] };
    this.calendars.push(calendar);
    return calendar;
  }

  addEvent(userId: number, event: { title: string; date: string }) {
    const calendar = this.calendars.find((cal) => cal.userId === userId);
    if (calendar) {
      const newEvent = { id: Date.now(), ...event };
      calendar.events.push(newEvent);
      return newEvent;
    }
    return null;
  }

  getEvents(userId: number) {
    const calendar = this.calendars.find((cal) => cal.userId === userId);
    return calendar ? calendar.events : [];
  }

  deleteEvent(userId: number, eventId: number) {
    const calendar = this.calendars.find((cal) => cal.userId === userId);
    if (calendar) {
      calendar.events = calendar.events.filter((event) => event.id !== eventId);
      return { message: 'Event deleted' };
    }
    return { message: 'Calendar or event not found' };
  }
}
