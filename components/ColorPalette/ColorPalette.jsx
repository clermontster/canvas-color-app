import { useState, useEffect} from 'react';
import { analyze, process_image } from '../../util/kmeans';


const ColorPalette = ({
  imgId = "pizza-img",
  ctxId,
  width = 600,
  height = 337
}) => {
  // const [canvasContext, setCanvasContext] = useState()
  // const [imgData, setImgData] = useState()
  //
  // useEffect(() => {
  //   const canvas = document.getElementById(id);
  //   setCanvasContext(canvas.getContext('2d'));
  // }, [id])
  //
  // // add image element to canvas
  // useEffect(() => {
  //   console.log('rendering canvas')
  //   if (canvasContext) {
  //     const img = new Image();
  //     img.crossOrigin = 'anonymous';
  //     img.src = '/pizza-hut-logo.jpg';
  //
  //     img.onload = () => {
  //       // canvasContext.drawImage(img, 0, 0);
  //       process_image(img, canvasContext);
  //     }
  //   }
  // },[canvasContext])

  useEffect(() => {
    const canvas = document.getElementById(ctxId).getContext('2d');
    const img = document.getElementById(imgId)

    process_image(img, canvas)

  },[])

  // useEffect(() => {
  //   if (imgData && imgData.data && imgData.data.length) {
  //     for(let i = 0; i <=imgData.data.length; i+=4) {
  //       const {data } = imgData;
  //       if (data[i] < 255 || data[i+1] < 255 || data[i+2] < 255) {
  //         console.log({
  //           r: data[i],
  //           g: data[i + 1],
  //           b: data[i + 2],
  //           a: data[i + 3],
  //         })
  //       }
  //     }
  //   }
  // },[imgData])

  return (
    <>
      <canvas id={ctxId} height={height} width={width}>
        browser cant render canvas api
      </canvas>
    </>
  )
}

export { ColorPalette }
