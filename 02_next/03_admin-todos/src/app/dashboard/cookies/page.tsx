import { TabBar } from "@/components/TabBar"
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
    title: 'Cookies Page',
    description: 'SEO Title'
}

export default async function CookiePage (){
    const cookieStore = await cookies()
    const cookieTab = cookieStore.get('selectedTab')?.value || '1'

    return(
        <>
            <h2>Cookie page</h2>

            <TabBar currentTab={ +cookieTab } />
        </>
    )
}