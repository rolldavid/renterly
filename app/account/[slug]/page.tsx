"use client"
import Account from "./components/Account"

export default function Page({params: {slug}}: {params: { slug: string }}) {

   const userId = parseInt(slug)
   
   return (
            <Account userId={userId}/>
   )
}

