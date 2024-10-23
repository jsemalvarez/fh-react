'use client'

// import { useRouter } from "next/navigation"
import { Todo } from "@prisma/client"

// import * as todosApi from '@/todos/helpers/todos';
import { TodoItem } from "./TodoItem"
import { toggleTodo } from "../actions/todo-actions"

interface Props{
    todos?: Todo[]
}

export const TodoGrid = ( { todos = []}: Props) => {

    //  consultando al back mediante API
    //  const router = useRouter(); 
    //  const toggleTodo = async(id: string, complete: boolean) => {
    //     await todosApi.updateTodo( id, complete );
    //     // una vez que se modifico la informacion en el back, actualizamos la informacion en el front
    //     router.refresh();
    //  }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                todos.map( item => (
                    <TodoItem key={ item.id } todo={ item } toggleTodo={ toggleTodo }/>
                ))
            }
        </div>
    )
}
