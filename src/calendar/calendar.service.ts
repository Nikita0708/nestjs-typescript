import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './calendar.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async createCalendar(userId: number) {
    return { message: 'Calendar created' }; // Placeholder implementation
  }

  async addEvent(userId: number, event: { title: string; date: string }) {
    const newEvent = this.eventRepository.create({
      user: { id: userId },
      ...event,
    });
    return this.eventRepository.save(newEvent);
  }

  async getEvents(userId: number) {
    return this.eventRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async deleteEvent(userId: number, eventId: number) {
    await this.eventRepository.delete(eventId);
    return { message: 'Event deleted' };
  }
}
