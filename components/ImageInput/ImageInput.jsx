import React, { useState } from 'react'
import styles from '../../styles/Home.module.css'

const ImageInput = ({handleOnload, shouldHideFileInput}) => {
  const [imagePreview, setImagePreview] = useState(null)
  const handleImageChange = (e) => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div >
      {!shouldHideFileInput && (
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
      )}
      <div>
        {imagePreview
          ? <img id="preview" onLoad={handleOnload} className={styles.imagePreview} src={imagePreview} />
          : <p>{'Please select an Image for Preview'}</p>
        }
      </div>
    </div>
  )
}

export { ImageInput }
