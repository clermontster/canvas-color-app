import { useEffect, useState } from "react";

const useColorPalette = (id) => {
  const [canvasContext, setCanvasContext] = useState()
  console.log('useColorPalette',id)
  useEffect(() => {
    if (document) {
      const canvas = document.getElementById(id);
      console.log({document})
      setCanvasContext(canvas.getContext('2d')); 
    }
  }, [id])
  
  return canvasContext;
}

export { useColorPalette }