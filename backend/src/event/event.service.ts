import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatDate } from 'src/common/utils/date.util';
import { Raw, Repository, Not, IsNull } from 'typeorm';

import { getFromDto } from '../common/utils/repository.util';
import { CreateEventCardDto } from './dtos/create_event_card.dto';
import { AddonIcon } from './entities/addon_icon.entity';
import { Collection } from './entities/collection.entity';
import { EventCard } from './entities/event_card.entity';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventCard)
    private readonly eventcardRepository: Repository<EventCard>,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    @InjectRepository(AddonIcon)
    private readonly addonIconRepository: Repository<AddonIcon>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async createEventCard(payload: any): Promise<EventCard> {
    const param = {
      ...payload,
      green_pass_needed: Number(payload.green_pass_needed) ? true : false,
    };

    delete param.owner_wallet;
    delete param.fee_percentage;
    console.log('event card create object: ', param);

    const eventCard: EventCard = getFromDto(param, new EventCard());
    await this.eventcardRepository.save(eventCard);

    return this.eventcardRepository.findOne({
      where: { id: eventCard.id },
    });
  }

  async createCollection(payload: any): Promise<Collection> {
    const param = {
      ...payload,
      // green_pass_needed: Number(payload.green_pass_needed) ? true : false,
    };

    // delete param.owner_wallet;
    // delete param.fee_percentage;
    // console.log('event card create object: ', param);

    const collection: Collection = getFromDto(param, new Collection());
    await this.collectionRepository.save(collection);

    return this.collectionRepository.findOne({
      where: { id: collection.id },
    });
  }

  getAllCollections(): Promise<Collection[]> {
    return this.collectionRepository.find({
      where: {
        deleted: Not(1),
      },
      relations: ['creator'],
    });
  }

  getAllAddonIcons(): Promise<AddonIcon[]> {
    return this.addonIconRepository.find({});
  }

  getAllEventCards(): Promise<EventCard[]> {
    return this.eventcardRepository.find({
      where: {
        deleted: Not(1),
      },
      relations: ['creator'],
    });
  }

  getLatestEventCards(): Promise<EventCard[]> {
    return this.eventcardRepository.find({
      where: {
        deleted: Not(1),
      },
      order: { createdAt: 'DESC' },
      relations: ['creator'],
      take: 10,
    });
  }

  findById(id: string): Promise<EventCard> {
    return this.eventcardRepository.findOne({
      relations: ['creator'],
      where: { id },
    });
  }

  findCollectionById(id: string): Promise<Collection> {
    return this.collectionRepository.findOne({
      relations: ['creator'],
      where: { id },
    });
  }

  findInCollection(id: string): Promise<EventCard[]> {
    return this.eventcardRepository.find({
      relations: ['creator'],
      where: { collection: id },
    });
  }

  async remove(id: string): Promise<void> {
    //hushi
    // await this.eventcardRepository.delete(id);
    const data = await this.eventcardRepository.findOne(id);
    data.deleted = 1;
    // data.deletedAt = new Date().toString();
    await this.eventcardRepository.save(data);
    console.log('hushi_re', data);
  }

  async updateUserTicket(
    id: string,
    tokenURL: string,
    ipfsURL: string,
    is_minted: number,
  ): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: id },
    });
    ticket.is_minted = is_minted;
    ticket.tokenURL = tokenURL;
    ticket.ipfsURL = ipfsURL;
    await this.ticketRepository.save(ticket);

    return this.ticketRepository.findOne({
      where: { id: id },
    });
  }

  async buyTicket(payload: any): Promise<Ticket> {
    const ticket: Ticket = getFromDto(payload, new Ticket());
    await this.ticketRepository.save(ticket);

    const eventCard = await this.eventcardRepository.findOne({
      where: { id: payload.eventcard },
    });
    eventCard.buy_count++;
    await this.eventcardRepository.save(eventCard);

    return this.ticketRepository.findOne({
      where: { id: ticket.id },
    });
  }

  async buyState(payload: any): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: ['buyer', 'eventcard', 'eventcard.creator'],
      where: {
        buyer: payload.buyer,
        eventcard: payload.eventcard,
      },
    });
  }

  async userTickets(userid): Promise<Ticket[]> {
    const tickets = this.ticketRepository.find({
      where: { buyer: userid, eventcard: Not(IsNull()) },
      relations: ['buyer', 'eventcard', 'eventcard.creator'],
    });

    return tickets;
  }

  async availableEvents(): Promise<EventCard[]> {
    const today = formatDate(new Date());
    return this.eventcardRepository.find({
      where: {
        date: Raw((alias) => `${alias} > :date`, { date: today }),
      },
      order: { createdAt: 'DESC' },
      relations: ['creator'],
    });
  }

  // hushi
  async getTickets(): Promise<Ticket[]> {
    const tickets = this.ticketRepository.find({
      where: {
        eventcard: Not(IsNull()),
      },
      relations: ['buyer', 'eventcard', 'eventcard.creator'],
    });
    console.log(tickets);

    return tickets;
  }
}
