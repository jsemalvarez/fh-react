const { Router } = require('express');

const eventsController = require('../controllers/events.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { vadarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.use( validarJWT );

router.get('/',eventsController.getEvents);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'La fecha de inicio es obligatorio').custom( isDate ),
        vadarCampos
    ],
    eventsController.createEvent
);

router.put('/:id',eventsController.updateEvent);

router.delete('/:id',eventsController.removeEvent);

module.exports = router;