import { Dispatch, SetStateAction } from "react"

export interface NavProps {
    nav: string
}

export interface AuthProps {
    status: "success" | "loading" | "error"
    userId: string | undefined
    session: boolean | undefined
    setShowModal?: Dispatch<SetStateAction<boolean>>
}