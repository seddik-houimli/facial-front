import React from 'react'
import PhotoFaceDetection from './PhotoFaceDetection'
function ImageDisplay({setLoading,setOpen,picture,setPictureFormat,setFileName,setLabels,setProbs}) {
  return (
    <div>
        <PhotoFaceDetection 
        setOpen={setOpen}
        Img={picture} 
        setFileName={setFileName} 
        setProbs={setProbs}
        setLabels={setLabels}
        setLoading={setLoading}
        />
    </div>
  )
}

export default ImageDisplay