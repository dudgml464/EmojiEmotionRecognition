import React from 'react';
import './App.css';

function Header() {
  return (
    <>
    <div className="help-tip">
        <p>카메라/이미지 메뉴 아래에 위치해 있는 이모티콘을 클릭하면 테스트 이미지를 확인 가능합니다.</p>
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