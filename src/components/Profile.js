import React, { useState } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios';
import ImageDisplay from './ImageDisplay';
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Profile = () => {
  const [picture, setPicture] = useState('')
  const [PictureFormat, setPictureFormat]=useState('')
  const [filename, setFileName]= useState('')
  const [probs, setProbs]= useState([])
  const [labels, setLabels] =useState([])
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    
    setPicture(pictureSrc)
  })
  return (
    <div className='container' style={{display:'flex'}}>
      <div className='right' style={{flex:1}}>
        <h5>{filename=="" ? "": <>File Name :{filename}</>  }</h5>
        {labels.length===0 ? "": "Labels"}
        <table>
          <thead></thead>
          <tbody>
          <tr>
        {labels.map((e,index)=>
          
            <th key={index}>{e==1 ? "Happy" : e==2 ? "Sad" : e==3 ? "Surprise" : "Angry"}</th>
            
           )}
           </tr>
           </tbody>
           <tfoot></tfoot>
          </table>
        {probs.length===0 ? "": "Probs"}
        <table>
        <thead></thead>
          <tbody>
          <tr>
        {probs.map((e,index)=>
        <th key={index}>{e}</th>
        )}
        </tr>
        </tbody>
        <tfoot></tfoot>
          </table>
      </div>
    <div className='left' style={{flex:1}}>
      <h2 className="mb-5 text-center">
        
      </h2>
      <div>
        {picture == '' ? (
            <>
            
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          </>
        ) : (
          <>
          <ImageDisplay 
          picture={picture} 
          setPictureFormatted={setPictureFormat} 
          setFileName={setFileName}
          setLabels={setLabels}
          setProbs={setProbs}
          />
          </>
        )}
      </div>




      <div>
        {picture != '' ? (
            <>
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture("")
            }}
            className="btn btn-primary"
          >
            Retake
          </button>
            </>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
              console.log(picture)
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div>
    </div>
    </div>
  )
}
export default Profile