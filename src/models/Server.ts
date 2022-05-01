import mongoose, { Schema, Document } from 'mongoose';
import { Snowflake } from 'discord.js';

export interface IServer extends Document{
    server_id: Snowflake,
    publicCommands: string[],
    locale: string
}

const ServerSchema: Schema = new Schema<IServer>({
    server_id: {
        type: String,
        unique: true,
        required: true
    },
    publicCommands: {
        type: Array,
        default: []
    },
    locale: {
        type: String,
        default: 'tr_TR'
    }
}, {
    timestamps: true
})

export default mongoose.model<IServer>('Server', ServerSchema)
