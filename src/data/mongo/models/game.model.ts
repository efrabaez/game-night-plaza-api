import moongose, { Schema } from "mongoose";

//schema (rules on how we wanna save our data)
const gameSchema = new moongose.Schema({
    name: {
        type: String,
        required: [true, 'Game name is required'],
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    players: {
        type: String,
        require: true,
    },
    duration: {
        type: Number,
        require: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }
    
});

export const GameModel = moongose.model('Game', gameSchema);