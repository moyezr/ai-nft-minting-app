import { useEffect, useState } from "react";

import styles from "./Navbar.module.css"


const Navbar = () => {
    const walletConnected = true;
    const [windowWidth, setWindowWidth] = useState("");
    
    useEffect(() => {
      setWindowWidth(window.innerWidth);
    }, [])
  return (
    <div className={styles.navbar_container}>
        <nav className={styles.navbar}>
                <p className={styles.logo}>{windowWidth > 768 ? "De Dev Collection" : "DDC"}</p>
                <p className={styles.navbar_link}>Get Whitelisted</p>    
                { walletConnected ? (
                    <p className={styles.connect_btn}>dklfsjfl;asd</p>
                ):(
                    <button className={styles.connect_btn}>Connect Wallet</button>
                ) }
        </nav>
    </div>
  )
}

export default Navbar