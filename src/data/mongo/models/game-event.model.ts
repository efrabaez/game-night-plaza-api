import moongose, { Schema } from "mongoose";

//schema (rules on how we wanna save our data)
const eventSchema = new moongose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        require: [true, 'A description is required']
    },
    location: {
        type: String,
        require: [true, 'Address is required']
    },
    date: {
        type: Date,
        require: [true, 'Date is required']
    },
    games: [{
            type: Schema.Types.ObjectId, 
            ref: 'Game',
            require: [true, 'game list is required']
    }],
    guests: {
        type: Number,
        require: [true, 'guests number is required']
    },
    guest_ids: [
        {
            type: Schema.Types.ObjectId,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
});

export const EventModel = moongose.model('Event', eventSchema);