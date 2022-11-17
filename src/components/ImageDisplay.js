import React from 'react'
import PhotoFaceDetection from './PhotoFaceDetection'
function ImageDisplay({picture,setPictureFormat,setFileName,setLabels,setProbs}) {
  return (
    <div>
        <PhotoFaceDetection 
        Img={picture} 
        setFileName={setFileName} 
        setProbs={setProbs}
        setLabels={setLabels}
        />
    </div>
  )
}

export default ImageDisplay