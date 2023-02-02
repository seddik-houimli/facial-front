import React, { useState } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios';
import ImageDisplay from './ImageDisplay';
import TableEmotions from './TableEmotions';
import Button from '@mui/material/Button';
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Profile = () => {
  const [open,setOpen]= useState(false)
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
  return (<>
  <div className='App-header'><h1>Facial emotions recognition tool</h1></div>
    <div className='container' style={{display:'flex'}}>
      <div className='right' style={{flex:1}}>
        <p>
          This work has been done during the bachelor thesis of Seddik Houimli about benchmarking of different AutoMLs for the problem of facial emotions recognition.

To use the tool take an image of your face and click on submit and in few seconds you will get the result.<br/> The model used is the model implemented with Azure AutoML platform and consists of 8 emotions: Neutral, Happiness, Sadness, Surprise, Fear, Disgust, Anger, Contempt.

The result is the percentage that the model predicts the face to be in each emotion.
        </p>
      
        <span>
Disclaimer: The tool does not save any data (images, IP addresses, or locations) about the users.
</span>
        <TableEmotions
        filename={filename}
        labels={labels}
        probs={probs}
        open={open}
        />
        
      </div>
    <div className='left' style={{flex:1}}>
      
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
          setOpen={setOpen}
          />
          </>
        )}
      </div>




      <div>
        {picture != '' ? (
            <>
          <Button
          style={{margin:'10px'}}
            onClick={(e) => {
              e.preventDefault()
              setPicture("")
              setOpen(false)
            }}
            variant='outlined'
          >
            Retake
          </Button>
            </>
        ) : (
          <Button
          style={{margin:'10px'}}
          variant='outlined'
            onClick={(e) => {
              e.preventDefault()
              capture()
              console.log(picture)
            }}
            
          >
            Capture
          </Button>
        )}
      </div>
    </div>
    </div>
    </>
  )
}
export default Profile