import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import {TextField} from '@mui/material';

/**
 * The home page of the website.
 * @return {JSX.Element}
 */
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <div className="w-full max-w-lg mx-auto py-16 flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-1 items-start">
            <p className="font-medium text-xl text-blue-600">
              This is a sample code using Next.js, TailwindCSS, and MUI.
            </p>
            <p>This is a flex box with vertical direction and a spacing of 0.5rem.</p>
            <p>And below is a MUI Text Field having its width constrained by tailwind css.</p>
            <TextField
              label="Text Field"
              variant="outlined"
              size="small"
              className="w-[150px]"
              fullWidth
            />
            <p>
              We cannot customize everything in Material UI by injecting classes. We can constrain basic properties but no advanced properties like colors in different state, etc.
            </p>
            <p className="font-medium text-lg py-6">
              The advantage of using TailwindCSS is that we can easily customize the properties of the components if we are not using MUI. We can have super easy and convenient control over all states like hover, focus, focus-within, etc. And we do not need to put everything in separate css files all the time! Reusability is also possible and convenient with Tailwind. But but but, all these things are not friendly with MUI because it uses customized classic CSS styles to do the customization and className prop cannot do a lot in this case. So we will decide if we are going to use pure MUI with classic CSS or use MUI with Tailwind. I believe in this case, using pure MUI with classic CSS makes more sense even though we loss some benefits from Tailwind.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            rowGap: '0.25rem',
          }}>
            <p style={{
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              fontWeight: '500',
              color: 'rgb(37 99 235)',
            }}>
              This is a sample code using Next.js and MUI (without Tailwind).
            </p>
            <p>
              You can check the code for differences.
            </p>
            <p>
              We might not end up using Tailwind because the customization of MUI is really inconvenient and it will confuse team members between class-based styles and classic CSS styles.
            </p>
          </div>
          <p>
            If you want to check the differences between using Tailwind and not using Tailwind, you can comment out all the @tailwind injection in ./styles/global.css
          </p>
        </div>


      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
