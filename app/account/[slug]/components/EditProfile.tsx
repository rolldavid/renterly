"use client"

import { Dispatch, SetStateAction, useState, useEffect, MouseEvent, SyntheticEvent } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image"
import { updateProfile, checkDisplayName, checkCity } from "@/lib/db-utils";
import { useScroll } from "@/lib/utils/ScrollPosition";
import styles from "./EditProfile.module.css"
import { EditProfileProps, ProfileUser } from "app/account/types";

let timeoutId: ReturnType<typeof setTimeout>;
let timeoutCity: ReturnType<typeof setTimeout>;

const names = ["Cow", "Dog", "Chicken", "Cat", "Piggy", "Duck", "Giraffe", "Bear", "Snake", "Grasshopper", "Daffodil", "Bones", "Rose", "Ghost", "Cactus"]
const adj = ["Silly", "Happy", "Mad", "Brave", "Bright", "Wise", "Cranky", "Kind", "Super", "Funny", "Wild", "Power"]


const schema = yup
.object({
  displayName: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required()
})
.required();

const stateList = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];

export default function EditProfile({user, setEditProfile} : { user: ProfileUser, setEditProfile: Dispatch<SetStateAction<boolean>> }) {
    
    const parsedState = user.citystate.slice((user.citystate.indexOf(",") + 2))
    const parsedCity = user.citystate.slice(0, user.citystate.indexOf(","))
    const [displayName, setDisplayName] = useState(user.displayName)
    const [city, setCity] = useState(parsedCity)
    const [nameAvailable, setNameAvailable] = useState(false)
    const [cityAvailable, setCityAvailable] = useState(true)
    const [nameStyle, setNameStyle] = useState("available")
    const [cityStyle, setCityStyle] = useState("cityStyleAvailable")
    const [activeName, setActiveName] = useState(user.image)

    const scrollPosition = useScroll()

    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<EditProfileProps>({
        resolver: yupResolver(schema),
      });


    const handleProfileUpdate = async (data: EditProfileProps, ) => {
        if (!nameAvailable || !cityAvailable) {
            return
        }

        if (user.userId) {
            await mutateAsync({displayName, city: data.city, state: data.state, image: activeName, userId: user.userId})
            setEditProfile(false)
        }
    }

    const { mutateAsync } = useMutation(updateProfile, {
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
          },
    });

    const checkNumLetter = (str : string) => {
        return /^[A-Za-z0-9]*$/.test(str);
      }

    useEffect(() => {
        if (timeoutId) clearTimeout(timeoutId)
        const handleLookup = async () => {
            if (displayName.length < 5) {
                setNameAvailable(false)
                    return
            } else {
                
                const onlyLettersNumbers = checkNumLetter(displayName)

                if (!onlyLettersNumbers) {
                    setNameAvailable(false)
                    return
                }
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


    useEffect(() => {
        if (timeoutCity) clearTimeout(timeoutCity)

        const handleLookup = async () => {
            if (displayName.length >= 3) {
                if (user.userId) {
                    const res = await checkCity(city)
                    setCityAvailable(res.cityAvailable)
                }
            }
        }
      timeoutCity = setTimeout(handleLookup, 350)
    }, [city])


    useEffect(() => {
        if (!cityAvailable) {
            setCityStyle("cityStyleUnavailable")
            return
        }
        setCityStyle("cityStyleAvailable")
        return
    }, [cityAvailable])

    const updateName = async (e: SyntheticEvent, name: string) => {
        e.preventDefault()
        setActiveName(name)
        const randomAdj = adj[Math.floor(Math.random() * adj.length)]; 
        const randomNum = Math.floor(Math.random() * 10000) 
        const displayName = randomAdj + name + randomNum
        setDisplayName(displayName)
    }

   
    return (
        
            <div className={styles.container}>
                <div className={styles.cancelContainer}>
                    <p className={styles.cancelButton} onClick={() => setEditProfile(false)}>X</p>
                </div>
                <form className={styles.formContainer} onSubmit={handleSubmit(handleProfileUpdate)}>
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
                            className={styles[cityStyle]}
                        />
                        <select {...register("state")} className={styles.inputState} defaultChecked defaultValue={parsedState}>
                            {stateList.map((state, index) => {
                                return <option value={state} key={index}>{state}</option>
                            })}
                            
                        </select>
                    </div>
                    <div className={styles.imageContainer}>
                        {names.map((name, index) => {
                            return (
                                    <Image 
                                        src={`/images/profile/${name}.png`} 
                                        width={75} 
                                        height={75} 
                                        alt="profile image"
                                        className={activeName === name ? styles.imageItemSelected : styles.imageItem}
                                        onClick={(e) => updateName(e, name)}
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


