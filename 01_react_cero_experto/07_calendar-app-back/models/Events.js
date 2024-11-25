const { Schema } = require("mongoose");


const EventSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start:{
        type: Date,
        required: true
    },
    encodeURIComponent:{
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

EventSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const Event = model('Event', EventSchema);

module.exports = Event;