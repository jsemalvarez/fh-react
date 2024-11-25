const Event = require('../models/Events');

const getEvents = async(req, res) => {

    try {

        const events = await Event.find().populate('user','name');

        res.json({
            ok: true,
            events
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }

}

const createEvent = async(req, res) => {

    try {

        const event = new Event( req.body );
        event.user = req.user.uid
        const eventSaved = await event.save();

        res.status(201).json({
            ok: true,
            event: eventSaved
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }

}

const updateEvent = async(req, res) => {

    try {

        const eventId = req.params.id;
        const userId = req.user.uid;

        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if(event.user.toString() !== userId){
            return res.status(401).json({
                ok: false,
                msg: 'No puede editar ese elemento'
            })
        }

        const eventUpdate = {
            ...req.body,
            user: userId
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, eventUpdate, {new: true} );

        res.json({
            ok: true,
            event: eventUpdated
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })       
    }

}

const removeEvent = async(req, res) => {

    try {

        const eventId = req.params.id;
        const userId = req.user.uid;

        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            })
        }

        if(event.user.toString() !== userId){
            return res.status(401).json({
                ok: false,
                msg: 'No puede eliminar ese elemento'
            })
        }


        const eventDeleted = await Event.findByIdAndDelete( eventId );

        res.json({
            ok: true,
            event: eventDeleted
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })       
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    removeEvent
}