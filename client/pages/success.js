import styles from "../styles/Success.module.css"
import Link from "next/link"
const success = () => {


  return (
    <div className={styles.success_container}>
      <p className={styles.success_txt}>
        Successfully Minted the NFT
      </p>
      <p className={styles.opensea_link}>You can view your NFT on <Link href="/">OpenSea</Link></p>
      <p className={styles.home_link}>Go Back to <Link href="/"> Home Page</Link></p>
</div>
  )
}

export default success