import { WidgetItem } from "@/components/WidgetItem";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function PageDasboard(){

    const session = await getServerSession();

    if(!session){
        redirect('/api/auth/signin')
    }

    return(
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            
            <WidgetItem title="Usuario conectado Server SIde">
                <div className="flex flex-col">
                    <div>Name: { session.user?.name }</div>
                    <div>Img: { session.user?.image }</div>
                    <div>Email: { session.user?.email }</div>
                </div>
            </WidgetItem>

        </div> 
    )
}