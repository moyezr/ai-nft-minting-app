import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import ai from "../public/ai.png"
import cat1 from "../public/cat1.jpg";
import cat2 from "../public/cat2.jpg";
import cat3 from "../public/cat3.jpg";
import cat4 from "../public/cat4.jpg";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([]);
  const submitHandler = async () => {
    try {
      setImages([])
      setLoading(true)
      const res = await axios.get(`/api/${prompt}`);
      setPrompt("");
      const imageURLs = res.data.imageURLs;
      setLoading(false)
      setImages(imageURLs);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <Head>
      <meta charset="UTF-8" />
      <meta name="description" content="An Ai NFT Minting website that mints nft after generating images from the start." />
      <meta name="keywords" content="Ai, NFT, Web3, App" />
      <meta name="author" content="John Doe" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={styles.main}>
      <div className={styles.promptBar_container}>
        <input
          className={styles.promptBar}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter Your Prompt"
          value={prompt}
        />
        <button onClick={submitHandler} className={styles.generate_btn}>
          Generate Image
        </button>
      </div>
      <p className={styles.user_guide_txt}>{images.length > 0 ? "Select the Image for which you want to mint an NFT" :"Generate Images by Entering Prompts in the above bar"}</p>
      
        <div className={styles.bottom_section}>
          {images.length > 0 ? (
            <div className={styles.images_container}>
              {
                images.map((el, i) => <Image alt="prompt images" src={el} width={400} height={400} className={styles.prompt_img} />)
              }
            </div>
          ): (
            <div className={styles.text_container}>
              { loading ? <p className={styles.cta_txt}>Loading...Fetching Image</p> : (
                <div className={styles.cta_container}>
              <h1 className={styles.cta_txt}>AI NFT Minting App</h1>
              <Image alt="ai robot" src={ai} width={400} height={400} className={styles.cta_img} />
              </div>
              ) }
              
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
