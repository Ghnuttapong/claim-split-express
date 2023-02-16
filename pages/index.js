import Head from "next/head";
import UploadPage from "../components/UploadPage";


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@100;300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <UploadPage />
        
        
      </main>
    </>
  );
}
