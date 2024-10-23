'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async( seconds: number = 0 ) => {

    return new Promise( resolve => {
      setTimeout(() => {
        resolve(true);
      },  seconds * 1000 );
    });
  
}

export const toggleTodo =  async( id: string, complete: boolean): Promise<Todo>=>{

    await sleep(3);

    const todo = await prisma.todo.findFirst({where:{ id:id }})

    if( !todo ){
        throw `Todo con id: ${id} no encontrado`;
    }

    const updateTodo = await prisma.todo.update({
        where: { id: id },
        data: { complete: complete }
    })

    revalidatePath('/dashboard/server-actions')
    return updateTodo;

}

export const addTodo =  async( description: string )=>{

    try {

        const todo = await prisma.todo.create({ data: { description }});
    
        revalidatePath('/dashboard/server-actions')
        return todo;
        
    } catch (error) {
        console.log(error);
        return {
            message: 'Error creando Todo'
        }
    }

}

export const deleteTodo = async() => {
    try {
        await prisma.todo.deleteMany({where: { complete: true }});

        revalidatePath('/dashboard/server-actions')
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}