"use client"

import { Dispatch, SetStateAction, useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image"
import { updateProfile, checkDisplayName } from "@/lib/db-utils";
import styles from "./EditProfile.module.css"

import { EditProfileProps, ProfileUser } from "app/account/types";

let timeoutId: ReturnType<typeof setTimeout>;


const schema = yup
.object({
  displayName: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required()
})
.required();

const stateList = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];

export default function EditProfile({user, setEditProfile} : { user: ProfileUser, setEditProfile: Dispatch<SetStateAction<boolean>> }) {
    const parsedCity = user.citystate.slice(0, user.citystate.indexOf(","))

    const [displayName, setDisplayName] = useState(user.displayName)
    const [city, setCity] = useState(parsedCity)
    const [nameAvailable, setNameAvailable] = useState(false)
    const [nameStyle, setNameStyle] = useState("available")
    const [userImage, setuserImage] = useState("")

    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<EditProfileProps>({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange'
      });

    const updateName = async (data: EditProfileProps, ) => {
        if (!nameAvailable) {
            return
        }

        if (user.userId) {
            await mutateAsync({displayName: data.displayName, city: data.city, state: data.state, image: userImage, userId: user.userId})
            setEditProfile(false)
        }
    }

    const { mutateAsync } = useMutation(updateProfile, {
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
          },
    });

    useEffect(() => {
        if (timeoutId) clearTimeout(timeoutId)

        const handleLookup = async () => {
            if (displayName.length >= 3) {
                if (user.userId) {
                    const res = await checkDisplayName(displayName, user.userId)
                    setNameAvailable(res.nameAvailable)
                }
            }
        }

      timeoutId = setTimeout(handleLookup, 350)

    }, [displayName])

    useEffect(() => {
        

        if (!nameAvailable) {
            setNameStyle("unavailable")
            return
        }
        setNameStyle("available")
        return

    }, [nameAvailable])



    return (
        <div className={styles.container}>
                <div className={styles.cancelContainer}>
                    <p className={styles.cancelButton} onClick={() => setEditProfile(false)}>X</p>
                </div>
                <form className={styles.formContainer} onSubmit={handleSubmit(updateName)}>
                    <input 
                        {...register("displayName")}
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        className={styles[nameStyle]}
                    />
                    <div className={styles.locationContainer}>
                        <input 
                            {...register("city")}
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            className={styles.inputCity}
                        />
                        <select {...register("state")} className={styles.inputState}>
                            {stateList.map((state, index) => {
                                return <option value={state} key={index}>{state}</option>
                            })}
                            
                        </select>
                    </div>
                    <div className={styles.imageContainer}>
                        {[...Array(12)].map((item, index) => {
                            if (index.toString() === user.image) {
                                return (
                                    
                                        <Image 
                                            src={`/images/profile/${index}.png`} 
                                            width={75} 
                                            height={75} 
                                            alt="profile image"
                                            className={styles.imageItemSelected}
                                            key={index}
                                        />
                                )
                            }
                            return (
                                    <Image 
                                        src={`/images/profile/${index}.png`} 
                                        width={75} 
                                        height={75} 
                                        alt="profile image"
                                        className={styles.imageItem}
                                        key={index}
                                    />
                               
                            )
                        })}
                    </div>
                    <div className={styles.saveWrapper}>
                        <button className={styles.saveButton} type="submit">SAVE</button>
                    </div>
                    
                </form>
        </div>
    )
}


