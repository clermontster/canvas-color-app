import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ColorPalette } from '../components/ColorPalette/ColorPalette'
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
        {/*<ColorPalette id="test" />*/}
        <ImageInput handleOnload={handleOnload} shouldHideFileInput={canShowPreviewLink} />

        {canShowPreviewLink && (
          <a href="/sample" className={styles.button}>Preview your color palettes</a>
        )}

      </main>
    </div>
  )
}
