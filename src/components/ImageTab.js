import { detectSingleFace, TinyFaceDetectorOptions, nets } from "face-api-arousal";
import React, { useEffect, useState, useRef, memo, useCallback, useMemo } from "react";
import "../styles/styles.css";
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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const ImageTab = ({ selectedImage }) => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [emotionKr, setEmotionKr] = useState(null);
  const imageRef = useRef();

  const emotionToEmoji = useMemo(() => ({
    angry: {
      component: (<FontAwesomeIcon className='Icon' icon={faFaceAngry} beat size='2xl' style={{ color: '#b80000' }} /> ),
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
    neutral: {
      component: ( <FontAwesomeIcon className='Icon' icon={faFaceMeh} fade size='2xl' style={{ color: '#808080' }} /> ),
      kr: '중립',
    },
  }), []);

  const initializeFaceAPI = useCallback(async () => {
    await Promise.all([
      nets.ssdMobilenetv1.loadFromUri("/models"),
      nets.faceExpressionNet.loadFromUri("/models")
    ]);
    setModelsLoaded(true);
  }, []);

  useEffect(() => {
    initializeFaceAPI();
  }, [initializeFaceAPI]);

  useEffect(() => {
    if (selectedImage) {
      setImageURL(selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (imageURL && modelsLoaded) {
      detectEmotions();
    }
  }, [imageURL, modelsLoaded]);

  const detectEmotions = useCallback(async () => {
    try {
      const faceDetection = await detectSingleFace(imageRef.current, new TinyFaceDetectorOptions()).withFaceExpressions();

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
    } catch (error) {
      console.error("감정을 감지하는 중 오류가 발생했습니다:", error);
    }
  }, [emotionToEmoji]);

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
            <p className='card-body e-container'>
              <span className="e1">
                {emotionKr ? (emotionKr) : (<Skeleton width={40} height={25} />)}
              </span>
              <span className="e2">
                {detectedEmotion ? (detectedEmotion) :(
                  <Skeleton className="skeleton-container" width={40} height={37} />
                )}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ImageTab);
