import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

const palettes = [
  {
    name: 'Pizza Hut',
    cssName: 'palettePizzaHut',
    square: 'squarePizzaHut'
  },
  {
    name: 'Blues',
    cssName: 'paletteBlues',
    square: 'squareBlues'
  },
  {
    name: 'Toast',
    cssName: 'paletteToast',
    square: 'squareToast'
  },
  {
    name: 'Black and white',
    cssName: 'paletteBW',
    square: 'squareBW'
  }
]

export default function Demo() {
  const [displayPalette, setDisplayPalette] = useState(palettes[0])

  return (
    <div className={styles[displayPalette.cssName]}>
      <div className={styles.demo}>
        <div className={styles.borderFrame}>
          <div>
            <h2>Here is an h2</h2>
            <h3>And a little bit more about that</h3>
            <p>Current Palette: {displayPalette.name}</p>
          </div>
          <div>
            <select name="select" id="demo-select">
              <option value="">Some things to select</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div className={styles.rows}>
              <div className={styles.borderFrame}>
                <h3>Section</h3>
                <p>Some text that goes here</p>
              </div>
              <div className={styles.borderFrame}>
                <h3>Section</h3>
                <p>Some text that goes here</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.borderFrame}>
          <h2>Palettes</h2>
          <div className={styles.palettes}>
            {palettes.map((pal, i) => 
              <div onClick={() => setDisplayPalette(palettes[i])}>
                <p>{pal.name}</p>
                <div 
                  className={styles[pal.square]}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.borderFrame}>
          <a href="/">Return to image upload</a>
        </div>
      </div>
    </div>
  )
}
