import styles from "../styles/Whitelist.module.css"
import { useEffect } from "react";
import { useDeDevsContext } from "../utils/DeDevsContext"
const whitelist = () => {

  const { totalWhitelisted, getWhitelisted, getTotalWhitelisted } = useDeDevsContext();

  useEffect(() =>{
    getTotalWhitelisted();
  }, [])

  return (
    <div className={styles.whitelist_container}>
        <h2 className={styles.whitelist_heading}>WHITELIST</h2>
        <p className={styles.whitelist_info}>{totalWhitelisted}/100 Adresses already Whitelisted!</p>
        <button className={styles.whitelist_btn} onClick={getWhitelisted}>Get Whitelisted</button>
    </div>
  )
}

export default whitelist