import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Request,
  UnauthorizedException,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { EmailService } from '../kit/email/email.service';
import * as randomstring from 'randomstring';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { UploadService } from 'src/common/upload/upload.service';
import { EventService } from './event.service';
import { EventCardDto } from './dtos/evet_card.dto';
import { CreateEventCardDto } from './dtos/create_event_card.dto';
import { CreateTicketDto } from './dtos/create_tickdt.dto';
import { Ticket } from './entities/ticket.entity';
import { CollectionDto } from './dtos/collection.dto';

@Controller('api/event')
@ApiTags('Event')
export class EventController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly eventService: EventService,
  ) {}

  @Post('create_collection')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'large_image', maxCount: 1 },
      { name: 'small_image', maxCount: 1 },
    ]),
  )
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async create_collection(
    @Body() body: CollectionDto,
    @UploadedFiles()
    files: {
      large_image?: Express.Multer.File[];
      small_image?: Express.Multer.File[];
    },
    @Request() req,
  ) {
    try {
      const largefileName =
        randomstring.generate({
          length: 16,
          charset: 'alphabetic',
        }) + '.jpg';

      const smallfileName =
        randomstring.generate({
          length: 16,
          charset: 'alphabetic',
        }) + '.jpg';
      const large_path = 'assets/uploads/eventcards/' + largefileName;
      const small_path = 'assets/uploads/eventcards/' + smallfileName;
      await this.uploadService.upload(large_path, files.large_image[0]);
      await this.uploadService.upload(small_path, files.small_image[0]);
      const collection = await this.eventService.createCollection({
        picture_large: large_path,
        picture_small: small_path,
        ...body,
      });
      return { success: true, collection };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  @Get('all_addonicons')
  @ApiOkResponse({ type: EventCardDto })
  async getAllAddonIcons(): Promise<any> {
    const icons = await this.eventService.getAllAddonIcons();
    return {
      success: true,
      addonicons: icons.map((icon) => icon.toCollectionDto()),
    };
  }

  @Get('all_collections')
  @ApiOkResponse({ type: EventCardDto })
  async getAllCollections(): Promise<any> {
    const collections = await this.eventService.getAllCollections();
    return {
      success: true,
      collections: collections.map((collection) =>
        collection.toCollectionDto(),
      ),
    };
  }

  @Get('/collection/:id')
  @ApiOkResponse({ type: EventCardDto })
  async getCollectionById(@Param('id') id: string): Promise<any> {
    const collection = await this.eventService.findCollectionById(id);
    if (collection) {
      return { success: true, collection: collection.toCollectionDto() };
    } else {
      return { success: false, message: "Can't find the event card:eventcard" };
    }
  }

  @Post('create_eventcard')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'large_image', maxCount: 1 },
      { name: 'small_image', maxCount: 1 },
    ]),
  )
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async create_event_card(
    @Body() body: CreateEventCardDto,
    @UploadedFiles()
    files: {
      large_image?: Express.Multer.File[];
      small_image?: Express.Multer.File[];
    },
    @Request() req,
  ) {
    try {
      const largefileName =
        randomstring.generate({
          length: 16,
          charset: 'alphabetic',
        }) + '.jpg';

      const smallfileName =
        randomstring.generate({
          length: 16,
          charset: 'alphabetic',
        }) + '.jpg';
      const large_path = 'assets/uploads/eventcards/' + largefileName;
      const small_path = 'assets/uploads/eventcards/' + smallfileName;
      await this.uploadService.upload(large_path, files.large_image[0]);
      await this.uploadService.upload(small_path, files.small_image[0]);
      const eventCard = await this.eventService.createEventCard({
        picture_large: large_path,
        picture_small: small_path,
        ...body,
      });
      return { success: true, eventcard: eventCard };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  @Get('eventcard_multi/latest')
  @ApiOkResponse({ type: EventCardDto })
  async getLatestEventCards(): Promise<any> {
    const eventCards = await this.eventService.getLatestEventCards();
    return {
      success: true,
      eventcards: eventCards.map((eventcard) => eventcard.toEventCardDto()),
    };
  }

  @Get('eventcard_multi')
  @ApiOkResponse({ type: EventCardDto })
  async getAllEventCards(): Promise<any> {
    const eventCards = await this.eventService.getAllEventCards();
    return {
      success: true,
      eventcards: eventCards.map((eventcard) => eventcard.toEventCardDto()),
    };
  }

  @Get('/in_collection/:id')
  @ApiOkResponse({ type: EventCardDto })
  async getEventInCollection(@Param('id') id: string): Promise<any> {
    const eventCards = await this.eventService.findInCollection(id);
    if (eventCards) {
      return {
        success: true,
        eventcards: eventCards.map((eventCard) => eventCard.toEventCardDto()),
      };
    } else {
      return { success: false, message: "Can't find the event card:eventcard" };
    }
  }

  @Get('/eventcard/:id')
  @ApiOkResponse({ type: EventCardDto })
  async getEventCardById(@Param('id') id: string): Promise<any> {
    const eventCard = await this.eventService.findById(id);
    if (eventCard) {
      return { success: true, eventcard: eventCard.toEventCardDto() };
    } else {
      return { success: false, message: "Can't find the event card:eventcard" };
    }
  }

  @Delete('/eventcard/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: EventCardDto })
  async deleteEventById(@Param('id') id: string): Promise<any> {
    try {
      await this.eventService.remove(id);
      return { success: true, message: 'Event deleted successfully!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Can't find the eventoooo...." };
    }
  }

  @Post('eventcard/buy_ticket')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async buy_ticket(@Body() body: CreateTicketDto, @Request() req) {
    console.log(body);
    const ticket = await this.eventService.buyTicket({
      ...body,
      buyer: req.user.id,
    });
    return { success: true, ticket: ticket };
  }

  @Get('eventcard/buy_ticket/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async buy_state(@Param('id') id: string, @Request() req): Promise<any> {
    console.log({
      buyer: req.user.id,
      eventcard: id,
    });
    const ticket = await this.eventService.buyState({
      buyer: req.user.id,
      eventcard: id,
    });
    if (ticket.length) return { success: true };
    else return { success: false };
  }

  @Get('eventcard_multi/user_tickets')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Ticket })
  async user_tickets(@Request() req): Promise<any> {
    const userid = req.user.id;

    const tickets = await this.eventService.userTickets(userid);
    return { success: true, tickets: tickets };
  }

  @Post('eventcard_multi/user_tickets')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async update_user_tickets(@Body() body: Ticket, @Request() req) {
    const ticket = await this.eventService.updateUserTicket(
      body.id,
      body.tokenURL,
      body.ipfsURL,
      body.is_minted,
    );
    console.log(body);
    return { success: true, ticket: ticket };
  }

  @Get('eventcard_multi/available_events')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Ticket })
  async available_events(@Request() req): Promise<any> {
    const events = await this.eventService.availableEvents();
    return { success: true, events: events };
  }

  @Get('eventcard_multi/tickets')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Ticket })
  async getTickets(@Request() req): Promise<any> {
    const tickets = await this.eventService.getTickets();
    return { success: true, tickets: tickets };
  }
}
