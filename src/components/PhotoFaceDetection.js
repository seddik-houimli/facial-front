import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import CircularProgress from '@mui/material/CircularProgress';
import "../styles.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



const PhotoFaceDetection = ({setLoading,setOpen,Img,setFileName,setLabels,setProbs}) => {
  const [inputArray, setInputArray] = useState(null);
  const [initializing, setInitializing] = useState(false);
  const [image, setImage] = useState(Img);
  const canvasRef = useRef();
  const imageRef = useRef();
  const [bwImageBase64, setBwImageBase64] = useState(null);
 
  async function handlePreprocessImage(inputImage) {
    // Load the image
    
    setInputArray("processedArray");
  }



  function getBlackAndWhiteImage(imageBase64) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageBase64;
      image.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL());
      };
      image.onerror = function(error) {
        reject(error);
      };
    });
  }
  
  


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

    <div className="image-container" >
      
  
      <div className="display-flex justify-content-center">
        <img ref={imageRef} src={image} alt="face" crossOrigin="anonymous" />
        <canvas ref={canvasRef} className="position-absolute" />
      </div>
      <br />
      {initializing ? <>
      <div className="circular" >
   <Box >
  <CircularProgress />
</Box>
      </div>
     
 
  </>:<> 
  {/**houni resultat lmodele */}
      {/** <img src={bwImageBase64} alt="Black and white image" />*/}
     {/**<img src={pic} alt="face" /> */} 


     {/**
      * this part is to make it black and white
      <button onClick={()=>{
      getBlackAndWhiteImage(pic)
      .then(bwImage => {
        setBwImageBase64(bwImage);
      })
      .catch(error => {
        console.error(error);
      });
      }}>clickPlease</button>
      */}
      
      {initializing ? "" : <>
      <Button
      style={{margin:'10px'}}
            onClick={(e) => {
              
              e.preventDefault()
             /* getBlackAndWhiteImage(pic)
      .then(bwImage => {
        setBwImageBase64(bwImage);
        console.log(bwImage)
      })
      .catch(error => {
        console.error(error);
      });*/
      if(pic==="")return;
    
      const convertBase64ToBinary = (pic) => {
        const binaryImage = new Uint8Array(atob(pic).split('').map(char => char.charCodeAt(0)));
        const binaryString = String.fromCharCode.apply(null, binaryImage);
        return btoa(binaryString);
      };
      
      
      const binaryImage = convertBase64ToBinary(pic.split(",")[1]);
      console.log(binaryImage);
      console.log("now old format ")
      console.log(pic)
      setLoading(true);
     
      const options = {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '9450a712b9msh5e4d8ca25fa1597p1a8cefjsn6a6b4e937582',
        'X-RapidAPI-Host': 'hydra-ai.p.rapidapi.com'
      },
      body: `{"image":"${binaryImage}"}`
    };
    
    fetch('https://hydra-ai.p.rapidapi.com/dev/faces/analyse/', options)
      .then(response => response.json())
      .then(response =>{
         console.log(response.body.detected_faces[0].info.emotions)
         setFileName(response.body.detected_faces[0].info.emotions)
        }).then(response=>{
        setOpen(true)
        setLoading(false);

        return;
      })
      .catch(err => console.error(err));
      

              //console.log(pic)
             // console.log(JSON.stringify({"data":pic.replace("data:image/png;base64,","")}))            
            }}
            variant='outlined'
          >
            Results
          </Button> 
      </>}
  </>}
     


      
      
    </div>
  );
};

export default PhotoFaceDetection;


/**
 * fetch(`https://facialwebapp.azurewebsites.net/api/GetProbs?`, {
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
                                  console.log(pic)
                                  console.log(resp[0])
                                  setFileName(resp[0].filename)
                                  setProbs(resp[0].probs)
                                  setLabels(resp[0].labels)
                                }).catch((error)=>{
                                  console.log(error)
                                  console.log(pic)
                                })  */