"use client"
import Account from "./components/Account"

export default function Page({params: {slug}}: {params: { slug: string }}) {
   
   return (
            <Account userId={slug}/>
   )
}

