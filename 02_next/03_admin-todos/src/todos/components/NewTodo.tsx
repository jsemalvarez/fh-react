'use client';

import { IoTrashOutline } from "react-icons/io5";
import { 
  // createTodo, 
  // deleteCompleted 
} from "../helpers/todos";
import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
import { createTodo, deleteTodo } from "../actions/todo-actions";


export const NewTodo = () => { 

  // const router = useRouter();

  const [description, setDescription] = useState('')

  const onNewTodo = async (e: FormEvent) => {
    e.preventDefault()
    if( description.trim().length === 0 ) return; 

    // creando mediante API
    // await createTodo(description);
    // router.refresh();
    // creando mediante SERVER ACTIONS
    await createTodo(description)
    setDescription('');

  }

  const onDeleteCompleted = async () => {
    // await deleteCompleted();
    // router.refresh();
    await deleteTodo()
  }

  return (
    <form  className='flex w-full' onSubmit={ onNewTodo }>
      <input 
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" 
        value={description}
        onChange={ (e) => setDescription(e.target.value) }
      />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      
      <span className='flex flex-1'></span>

      <button 
        onClick={ () => onDeleteCompleted() }
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Delete
      </button>


    </form>
  )
}