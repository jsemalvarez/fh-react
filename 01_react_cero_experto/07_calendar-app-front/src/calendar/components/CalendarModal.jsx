import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { es } from 'date-fns/locale/es';
registerLocale('es', es)

import './CalendarModal.css'
import { useCalendarStore, useUiStore } from '../../hooks';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const getEndOfDay = ( date ) => {
    console.log(date)
    return date.setHours(23, 59, 59, 999);
}

export const CalendarModal = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { isDateModalOpen, closeDateModal } = useUiStore()
    const { activeEvent, startSavingEvent } = useCalendarStore()
    
    const [formData, setFormData] = useState({
        title:'',
        notes:'',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    useEffect(() => {

        if(activeEvent !== null ){
            console.log({activeEvent})
            setFormData({...activeEvent })
        }

    }, [activeEvent])

    const titleClass = useMemo( () => {

        if( !formSubmitted ) return '';

        return (formData.title.length > 0)
            ? 'is-valid'
            : 'is-invalid'

    }, [formData.title, formSubmitted])


    const onInputChanged = ({ target }) => {
        setFormData((state) => {
            return {
                ...state,
                [target.name]: target.value
            }
        })
    }

    const onDateChanged = ( date, changing ) => {

        setFormData((state) => {
            return {
                ...state,
                [changing]: date
            }
        })
    }

    const onCloseModal = () => {
        closeDateModal()
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const dateDifference = differenceInSeconds( formData.end, formData.start );

        if( isNaN(dateDifference) || dateDifference <= 0 ){
            Swal.fire('Fechas Incorrectas', 'Revisar las fechas','error')
            return;
        }

        if ( formData.title.length <= 0 ) return;

        console.log(formData);
        await startSavingEvent( formData );
        closeDateModal();
        setFormSubmitted( false )
    }

  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={customStyles}
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={ 200 }
    >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker 
                    className='form-control'
                    minDate={ new Date() }
                    minTime={ new Date() }
                    maxTime={ getEndOfDay( new Date() ) }
                    selected={ formData.start }
                    onChange={ event => onDateChanged( event, 'start' )}
                    dateFormat='Pp'
                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker 
                    className="form-control"
                    minDate={ formData.start }
                    selected={ formData.end }
                    onChange={ event => onDateChanged( event, 'end' )}
                    dateFormat='Pp'
                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ formData.title }
                    onChange={ onInputChanged }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formData.notes }
                    onChange={ onInputChanged }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
