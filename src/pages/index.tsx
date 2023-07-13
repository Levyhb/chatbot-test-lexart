import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import optusIcon from "../../public/optus-icon.png";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from '@mui/icons-material/Info';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.chatbot}>
        <div className={styles.chat_header}>
          <ArrowBackIcon />
          <div className={styles.chat_header_user}>
            <Image src={optusIcon} alt="" />
            <div className={styles.chat_header_user_info}>
              <h2>Optus</h2>
              <span>Tipically replies in a day</span>
            </div>
          </div>
          <div className={styles.verify_user}>
            <CheckIcon/>
            <ArrowDropDownIcon />
          </div>
          <InfoIcon />
        </div>

        <div className={styles.chat_user}>
          <Image src={optusIcon} alt="" />
          <div className={styles.chat_user_info}>
            <h2>Optus <CheckIcon /></h2>
            <span>419k peopple like this including Maha Mourad and 35 friends</span>
            <span>Company</span>
          </div>
        
        </div>

        <div className={styles.chat_messages}></div>

        <div className={styles.chat_type_messages}></div>
      </main>
    </>
  );
}
