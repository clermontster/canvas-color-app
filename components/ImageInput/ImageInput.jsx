import React, { useState } from 'react'
import {extractColourPalette} from "../../util/kmeans";

const ImageInput = () => {
  const [colorPalette, setColorPalette] = useState([])
  const handleImageChange = (e) => {

    const reader = new FileReader()
    const file = e.target.files[0]
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');

    reader.onload = (event) => {
      const img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Extract colour palette from image
        const palettes = extractColourPalette(ctx, 5);
        console.log(palettes)
        setColorPalette(palettes);
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  return (
    <div >
      <p>{'Please select an Image for Preview'}</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <div>
        {colorPalette && (
          <ul className="palette">
            {colorPalette.map((color, index) => (
              <li key={index} style={{backgroundColor: color}}>{color}</li>
            ))}
          </ul>
        )}

        <canvas id='canvas' >
          browser cant render canvas api
        </canvas>
      </div>
    </div>
  )
}

export { ImageInput }
