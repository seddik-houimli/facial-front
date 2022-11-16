import React, { useState } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios';
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Profile = () => {
  const [picture, setPicture] = useState('')
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
        <h5>File Name :{filename}</h5>
        {labels.length===0 ? "": "Labels"}
        <table>
          <tr>
        {labels.map((e,index)=>
          
            <th index={index}>{e}</th>
            
           )}
           </tr>
          </table>
        {probs.length===0 ? "": "Probs"}
        <table>
          <tr>
        {probs.map((e,index)=>
        <th index={index}>{e}</th>
        )}
        </tr>
          </table>
      </div>
    <div className='left' style={{flex:1}}>
      <h2 className="mb-5 text-center">
        React Photo Capture using Webcam Examle
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
          <img src={picture} />
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
          <button
            onClick={(e) => {
              e.preventDefault()
              
              console.log(JSON.stringify({
                "data":picture.replace("data:image/jpeg;base64,","")
              }
              ))
              fetch(`http://localhost:7071/api/CreateExpenses`, {
                                method: "POST",
                                headers: {
                                    'Content-Type':'application/json',
                                     'Authorization':('Bearer '+'ER4s9bS3T2p80Vws16Eg7jI3kU2CBSqU'),
                                      'azureml-model-deployment': 'default',
                                      'Access-Control-Allow-Origin': '*'
                                 },
                                body: JSON.stringify({
                                  "data":picture.replace("data:image/jpeg;base64,","")
                                }
                                )
                            })
                                .then(resp => resp.json()).then(resp=>{
                                  console.log(resp[0])
                                  setFileName(resp[0].filename)
                                  setProbs(resp[0].probs)
                                  setLabels(resp[0].labels)
                                }).catch((error)=>console.log(error))
                                
                                console.log()
            }}
            className="btn btn-primary"
          >
            Results
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