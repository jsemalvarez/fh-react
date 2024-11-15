'use client';

import { useSession } from "next-auth/react"


export default function ProfilePage(){

    const { data: session, status } = useSession()

    if(status === 'loading'){
        return(
            <h2>Cargando . . . </h2>
        )
    }

    return(
        <div>
            <h2>Profile Page</h2>
            <hr />

            <div className="flex flex-col">
                <span>{ session?.user?.name || 'No Name' }</span>
                <span>{ session?.user?.email || 'No email' }</span>
            </div>
        </div>
    )
}