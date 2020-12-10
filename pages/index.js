import {useState} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ImageInput } from '../components/ImageInput/ImageInput'

export default function Home() {
  const [canShowPreviewLink, setCanShowPreviewLink] = useState(false)
  const handleOnload =() => {
    setCanShowPreviewLink(true)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ImageInput handleOnload={handleOnload} shouldHideFileInput={canShowPreviewLink} />
        {/*<ColorPalette ctxId="test" imgId='preview' />*/}

        {canShowPreviewLink && (
          <a href="/sample" className={styles.button}>Preview your color palettes</a>
        )}

        <canvas id='canvas' >
          browser cant render canvas api
        </canvas>
      </main>
    </div>
  )
}
