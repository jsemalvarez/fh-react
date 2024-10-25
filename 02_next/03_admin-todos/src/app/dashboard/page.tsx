import { WidgetItem } from "@/components/WidgetItem";

export default function PageDasboard(){
    return(
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
            <WidgetItem title="Sin contenido">
                <h2>----</h2>
            </WidgetItem>

        </div> 
    )
}