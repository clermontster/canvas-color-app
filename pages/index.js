import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ColorPalette} from '../components/ColorPalette/ColorPalette'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ColorPalette id="test" />
      </main>
    </div>
  )
}
