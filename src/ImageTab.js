import * as faceapi from "face-api-arousal";
import React, {useEffect, useState, useRef, useMemo} from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceAngry,
  faFaceFlushed,
  faFaceMeh,
  faFaceSurprise,
  faFaceSadTear,
  faFaceLaughSquint,
  faFaceGrimace
} from "@fortawesome/free-solid-svg-icons";
function ImageTab({ selectedImage }) {
  //모드 로드 여부
  const [modelsLoaded, setModelsLoaded] = useState(false);
  //이미지 URL 저장
  const [imageURL, setImageURL] = useState("");
  //이모지 및 라벨
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [emotionKr, setEmotionKr] = useState(null);
  //이미지 감지
  const imageRef = useRef();

  const emotionToEmoji = useMemo(() => ({
      angry: { component: (<FontAwesomeIcon className='Icon' icon={faFaceAngry} beat size='2xl' style={{ color: '#b80000' }} /> ),
        kr: '화남',
      },
      disgusted: {
        component: ( <FontAwesomeIcon className='Icon' icon={faFaceGrimace} beatFade size='2xl' style={{ color: '#76a532' }} /> ),
        kr: '역겨움',
      },
      fearful: { component: ( <FontAwesomeIcon className='Icon' icon={faFaceFlushed} spinPulse size='2xl' style={{ color: '#2C3E50' }} /> ),
        kr: '두려움',
      },
      happy: {
        component: ( <FontAwesomeIcon className='Icon' icon={faFaceLaughSquint} bounce size='2xl' style={{ color: '#ffff00' }} /> ),
        kr: '기쁨',
      },
      sad: {
        component: ( <FontAwesomeIcon className='Icon' icon={faFaceSadTear} beatFade size='2xl' style={{ color: '#0000ff' }} /> ),
        kr: '슬픔',
      },
      surprised: {
        component: ( <FontAwesomeIcon className='Icon' icon={faFaceSurprise} flip size='2xl' style={{ color: '#9932cc' }} /> ),
        kr: '놀람',
      },
      neutral: { component: ( <FontAwesomeIcon className='Icon' icon={faFaceMeh} fade size='2xl' style={{ color: '#808080' }} /> ),
        kr: '중립',
      },
    }), []
  );
  
  useEffect(() => {
    initializeFaceAPI();
  }, []);

  const initializeFaceAPI = async () => {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]);
    setModelsLoaded(true);
  };

  useEffect(() => {
    if (selectedImage) {
      setImageURL(selectedImage);
    }
    if (imageURL) {
      detectEmotions();
    }
  }, [selectedImage, imageURL, modelsLoaded]);   

  const detectEmotions = async () => {
    if (modelsLoaded) {
      const faceDetection = await faceapi
        .detectSingleFace(imageRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (faceDetection) {
        const maxValue = Math.max(...Object.values(faceDetection.expressions));
        for (const [key, value] of Object.entries(faceDetection.expressions)) {
          if (value === maxValue) {
            setDetectedEmotion(emotionToEmoji[key].component);
            setEmotionKr(emotionToEmoji[key].kr);
          }
        }
      } else {
        setDetectedEmotion(null);
        setEmotionKr(null);
      }
    }
  };

  return (
    <div className="ImageTab">
      {imageURL && (
        <div className="Main">
          <div className="card">
            <div className="card-image">
              <div className="imageContainer">
                <img
                  sizes="(max-width: 600px) 1050px,
                    (max-width: 1200px) 1600px
                    1400px"
                  crossOrigin="anonymous"
                  ref={imageRef}
                  src={imageURL}
                  alt={imageURL}
                  onLoad={detectEmotions}
                  media="(max-resolution: 2dppx)"
                />
              </div>
            </div>
            <p className="card-title">감지된 감정</p>
            <p className="card-body">
              <span className="e1">{emotionKr}</span>
              <span className="e2">{detectedEmotion}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageTab;