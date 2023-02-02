import React from 'react'
import PhotoFaceDetection from './PhotoFaceDetection'
function ImageDisplay({setOpen,picture,setPictureFormat,setFileName,setLabels,setProbs}) {
  return (
    <div>
        <PhotoFaceDetection 
        setOpen={setOpen}
        Img={picture} 
        setFileName={setFileName} 
        setProbs={setProbs}
        setLabels={setLabels}
        />
    </div>
  )
}

export default ImageDisplay