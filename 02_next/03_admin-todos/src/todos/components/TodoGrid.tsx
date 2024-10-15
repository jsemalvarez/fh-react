'use client'

import { useRouter } from "next/navigation"
import { Todo } from "@prisma/client"

import * as todosApi from '@/todos/helpers/todos';
import { TodoItem } from "./TodoItem"

interface Props{
    todos?: Todo[]
}

export const TodoGrid = ( { todos = []}: Props) => {

    const router = useRouter(); 

    const toggleTodo = async(id: string, complete: boolean) => {
        await todosApi.updateTodo( id, complete );
        router.refresh();
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                todos.map( item => (
                    <TodoItem key={ item.id } todo={ item } toggleTodo={toggleTodo}/>
                ))
            }
        </div>
    )
}
