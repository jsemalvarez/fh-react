import { WidgetGrid } from "@/components/WidgetGrid";

export const metada = {
    title: 'Admin Dasboard',
    description: 'SEO Title'
}

export default function MainPage () {

    return(
        <div className="text-black p-2">
            <h1 className="mt-2 text-3xl">Dasboard</h1>
            <span className="text-xl">Informacion general</span>

            <WidgetGrid />
        </div>
    )
}