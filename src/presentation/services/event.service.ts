import { EventModel, GameModel } from "../../data";
import { CreateEventDto, CustomError, EventEntity, PaginationDto } from "../../domain";

//Route calls controller, then controller calls service
export class EventService {
    
    //DI
    constructor(){}

    public async createEvent(createEventDto: CreateEventDto) {
        let response = {};
        const eventExist = await EventModel.findOne({name: createEventDto.name});
        try {
            await Promise.all (createEventDto.games.map(async (game) => await GameModel.findOne({_id: game})))
        } catch (error) {
            throw CustomError.badRequest('Create Event - A Game ID is not valid')
        }
        //console.log(games);
        if (eventExist) {
            throw CustomError.badRequest('Event already exist')
        };

        try {
            const event =  new EventModel(createEventDto);
            await event.save();
            //const {category, ...rest} = EventEntity.fromObject(event);
            response = {
                data: [EventEntity.fromObject(event)],
                mesage: 'Success',
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

        return response;
    }   

    public async getEvents(paginationDto: PaginationDto) {
        const {page, limit} = paginationDto;

        try {
            const [total, events] = await Promise.all([
                EventModel.countDocuments(),
                EventModel.find().skip((page - 1 ) * limit).limit(limit),
                // TODO: Populate
            ]);
            return {
                data: events.map( (event) => ({ event })),
                page: page,
                limit: limit,
                total: total,
                next: `/api/events/?page=${page+1}&limit=${limit}`,
                prev: (page -1 > 0)? `/api/events/?page=${page-1}&limit=${limit}` : null,
                mesage: 'Success',
            }
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error');
        }
    }
}