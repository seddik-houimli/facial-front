import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

import "../styles.css";

const PhotoFaceDetection = ({Img,setFileName,setLabels,setProbs}) => {
  const [initializing, setInitializing] = useState(false);
  const [image, setImage] = useState(Img);
  const canvasRef = useRef();
  const imageRef = useRef();

  // I want to store cropped image in this state
  const [pic, setPic] = useState();

  useEffect(() => {
    const loadModels = async () => {
      setInitializing(true);
      console.log("setting to true")
      Promise.all([
        // models getting from public/model directory
        faceapi.nets.tinyFaceDetector.load("/models"),
        faceapi.nets.faceLandmark68Net.load("/models"),
        faceapi.nets.faceRecognitionNet.load("/models"),
        faceapi.nets.faceExpressionNet.load("/models")
      ])
        .then(console.log("success", "/models"))
        .then(handleImageClick)
        .catch((e) => console.error(e));
    };
    loadModels();
  }, []);

  const handleImageClick = async () => {
    if (initializing) {
      setInitializing(false);
      console.log("setting to false")
    }
    canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
      imageRef.current
    );

    const displaySize = {
      width: 500,
      height: 350
    };
    faceapi.matchDimensions(canvasRef.current, displaySize);
    const detections = await faceapi.detectSingleFace(
      imageRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    // .withFaceLandmarks();
    const resizeDetections = faceapi.resizeResults(detections, displaySize);
    canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, displaySize.width, displaySize.height);
    faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
    // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);
    console.log(
      `Width ${detections.box._width} and Height ${detections.box._height}`
    );
    extractFaceFromBox(imageRef.current, detections.box);
    console.log(detections);
  };

  async function extractFaceFromBox(imageRef, box) {
    const regionsToExtract = [
      new faceapi.Rect(box.x, box.y, box.width, box.height)
    ];
    let faceImages = await faceapi.extractFaces(imageRef, regionsToExtract);

    if (faceImages.length === 0) {
      console.log("No face found");
    } else {
      const outputImage = {};
      faceImages.forEach((cnv) => {
        outputImage.src = cnv.toDataURL();
        setPic(cnv.toDataURL());
      });
      // setPic(faceImages.toDataUrl);
      console.log("face found ");
      setInitializing(false)
      
    }
  }

  return (
    <div className="App">
      <span>{initializing ? "Initializing" : "Ready"}</span>
      <div className="display-flex justify-content-center">
        <img ref={imageRef} src={image} alt="face" crossOrigin="anonymous" />
        <canvas ref={canvasRef} className="position-absolute" />
      </div>
      <br />
      <img src={pic} alt="face" />
      {initializing ? "" : <>
      <button
            onClick={(e) => {
              e.preventDefault()
              //console.log(pic)
             // console.log(JSON.stringify({"data":pic.replace("data:image/png;base64,","")}))
              fetch(`https://facialwebapp.azurewebsites.net/api/GetProbs?`, {
                                method: "POST",
                                headers: {
                                    'Content-Type':'application/json',
                                     'Authorization':('Bearer '+'ER4s9bS3T2p80Vws16Eg7jI3kU2CBSqU'),
                                      'azureml-model-deployment': 'default',
                                      'Access-Control-Allow-Origin': '*'
                                 },
                                body: JSON.stringify({
                                  "data":pic.replace("data:image/png;base64,","")
                                }
                                )
                            })
                                .then(resp => resp.json()).then(resp=>{
                                  console.log(resp[0])
                                  setFileName(resp[0].filename)
                                  setProbs(resp[0].probs)
                                  setLabels(resp[0].labels)
                                }).catch((error)=>console.log(error)) 
                                
                                
            }}
            className="btn btn-primary"
          >
            Results
          </button> 
      </>}
      
    </div>
  );
};

export default PhotoFaceDetection;