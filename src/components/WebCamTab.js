import { detectSingleFace, TinyFaceDetectorOptions, nets } from 'face-api-arousal';
import React, { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react';
import '../styles/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaceAngry,
  faFaceFlushed,
  faFaceMeh,
  faFaceSurprise,
  faFaceSadTear,
  faFaceLaughSquint,
  faFaceGrimace,
} from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const videoHeight = 480;
const videoWidth = 640;
const WebCamTab = ({ active }) => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState('');
  const [emotionKr, setEmotionKr] = useState('');
  const videoRef = useRef();
  
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
    }), []
  );

  useEffect(() => {
    loadModels();
  }, []);

  const stopVideo = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
      setModelsLoaded(false);
    }
  }, []); 

  const startVideo = useCallback(async () => {
    if (!modelsLoaded) {
      await loadModels();
    }
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: videoWidth, height: videoHeight },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
  
      const playPromise = new Promise((resolve) => {
        if (videoRef.current) {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            resolve();
          };
        }
      });
      await playPromise;

      const handleEmotionInterval = setInterval(async () => {
        if (videoRef.current) {
          const detections = await detectSingleFace(videoRef.current, new TinyFaceDetectorOptions()).withFaceExpressions();

          if (detections) {
            const maxValue = Math.max(...Object.values(detections.expressions));
            const detectedEmotion = Object.keys(detections.expressions).find(
              (key) => detections.expressions[key] === maxValue
            );
            setDetectedEmotion(emotionToEmoji[detectedEmotion]);
            setEmotionKr(emotionToEmoji[detectedEmotion].kr);
          }
        }
      }, 100);

      videoRef.current.handleEmotionIntervalId = handleEmotionInterval;
    } catch (err) {
      console.error('Error:', err);
    }
  }, [modelsLoaded, emotionToEmoji]);

  const handleVisibilityChange = useCallback(async () => {
    if (document.hidden) {
      stopVideo();
    } else if (active) {
      await startVideo();
    }
  }, [active, startVideo]);

  useEffect(() => {
    if (active) {
      startVideo();
    }
  
    return () => {
      stopVideo();
    };
  }, [active, startVideo, stopVideo]);
  
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
  
  async function loadModels() {
    await Promise.all([
      nets.tinyFaceDetector.loadFromUri('/models'),
      nets.faceExpressionNet.loadFromUri('/models')
    ]);
    setModelsLoaded(true);
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoRef]);

  return (
    <div className={`WebCam ${active ? 'visible' : 'hidden'}`}>
      {modelsLoaded && active && (
        <div className="Main">
          <div className='card'>
            <div className='card-image'>
            <video
              ref={videoRef}
              height={videoHeight}
              width={videoWidth}
              playsInline
              controls={false}
            />
            </div>
            <p className='card-title'>감지된 감정</p>
            <p className='card-body e-container'>
              <span className="e1">
                {emotionKr ? (emotionKr) : (<Skeleton width={40} height={25} />)}
              </span>
              <span className="e2">
                {detectedEmotion.component ? (detectedEmotion.component) :(
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

export default memo(WebCamTab);