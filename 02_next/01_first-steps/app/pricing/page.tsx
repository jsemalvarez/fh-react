
import { Metadata } from "next"

export const metadata:Metadata = {
    title:'Pricing Page',
    description:'Pricing Page description',
    keywords: ['Pricing Page', 'josema']
}

export default function PricingPage(){
    return(
        <>
            <span className="text-7xl">Pricing Page</span>
        </>       
    )
}