"use client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Account from "./components/Account"

const queryClient = new QueryClient();

export default function Page({params: {slug}}: {params: { slug: string }}) {
   
   return (
        <QueryClientProvider client={queryClient}>
            <Account userId={slug}/>
        </QueryClientProvider>
   )
}

