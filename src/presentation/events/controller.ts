import { Request, Response } from "express";
import {CreateEventDto, CustomError, PaginationDto } from "../../domain";
import { EventService } from "../services";

export class EventController {
    constructor(
        private readonly eventService: EventService,
    ){}

    private handleError = ( error: unknown, res: Response ) => {
        console.log('Handle error');
        if ( error instanceof CustomError ){
            return void res.status(error.statusCode).json({
                data: [],
                message: `${error}`,
            });
        }

        console.log(`${error}`);
        return void res.status(500).json({
            data: [],
            message: `Internal server error`,
        });
    }

    createEvent = (req: Request, res: Response) => {
        const [error, createEventDto] = CreateEventDto.create({
            ...req.body,
            user: req.body.user.id,
        });
        if (error) {
            return void res.status(400).json({
                data: [],
                message: `${error}`,
            });
        }

        this.eventService.createEvent(createEventDto!)
            .then( (event) => void res.status(201).json(event))
            .catch( error => this.handleError(error, res));
    }

    getEvents = (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginationDto.create (+page, +limit);

        if (error) return void res.status(400).json({data: [], message: error});

        this.eventService.getEvents(paginationDto!)
            .then( (events) => void res.json(events))
            .catch( error => this.handleError(error, res));
    }
}
