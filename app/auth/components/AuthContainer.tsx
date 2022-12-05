"use client"

import { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";

export default function Page() {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <>
            {isLogin && <Login isLogin={isLogin} setIsLogin={setIsLogin}/>}
            {!isLogin && <Signup isLogin={isLogin} setIsLogin={setIsLogin}/>}
        </>
    )
}
