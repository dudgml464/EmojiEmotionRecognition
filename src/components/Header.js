import React from 'react';
import '../styles/App.css';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion,  faCameraRetro, faImage  } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <>
    <div className="questionIcon">
      <div className="iconBackground tooltip">
      <FontAwesomeIcon icon={faQuestion} style={{color: "#ffffff",}} />
      </div>
      <Tooltip anchorSelect=".tooltip" place="top" effect="solid">
        <p className="Tip">
          카메라/이미지 메뉴를 클릭하면 탭이동이 가능합니다.
          <br/>
          [카메라] <FontAwesomeIcon icon={faCameraRetro} size="sm" style={{color: "#ffffff",}} /> 아이콘를 클릭하고, 얼굴인식을 정면으로 카메라를 바라봐주세요.
          <br/>
          [이미지] <FontAwesomeIcon icon={faImage} size="sm" style={{color: "#ffffff",}} /> 아이콘를 클릭하고, 사람 얼굴의 이미지를 업로드해주세요.
          <br/>
          [이모지 버튼]
          감정 테스트를 하려면 카메라/이미지 메뉴 아래에 
          <br/>
          위치한 이모지 아이콘을 클릭하세요.
          <br/>
          이를 통해 화남[angry], 두려움[fearful], 중립[neutral],
          <br/>
          놀람[surprised], 슬픔[sad], happy [기쁨], disgusted [역겨움]
          <br/>
          7가지 감정을 테스트할 수 있습니다. 
        </p>
      </Tooltip>
    </div>
    <div className='header'>
      <div id="text-drop">
        <span className="h-0">E</span>
        <span className="h-1">m</span>
        <span className="h-2">o</span>
        <span className="h-3">j</span>
        <span className="h-4">i</span>   
      </div>
      <div id="ES">
        <span className="h-5">Emotion Recognition</span>
        <span className="smile">:)</span>
      </div>
    </div>
    </>
  );
}
export default Header;