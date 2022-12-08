import Image from "next/image";

import styles from "./Stars.module.css"

export default function Stars() {
    return (
        <div className={styles.starContainer}>{[...Array(5)].map((star, index) => {        
            return (         
            <span 
                className={styles.starMapItem}
                key={index}
            >
                <Image 
                        src={"/emptyStar.png"} 
                        width={30} 
                        height={30} 
                        alt="rating star" 
                        className={styles.starItem}
                    />
            </span>        
            );
        })}
    </div>
    )
}