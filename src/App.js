import React, { useState, useCallback, createRef } from 'react';
import './styles/App.css';
import WebCamTab from './components/WebCamTab';
import ImageTab from './components/ImageTab';
import TabMenu from './components/TabMenu';
import Header from './components/Header';
import EmojiMenu from './components/EmojiMenu';
function App() {
  const [activeTab, setActiveTab] = useState('webcam');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInput = createRef();

  const handleClickWebcamTab = useCallback(() => {
    setActiveTab('webcam');
  }, []);

  const handleClickImageTab = useCallback(() => {
    fileInput.current && (fileInput.current.value = null); // 파일 선택값 초기화
    fileInput.current && fileInput.current.click(); // input 엘리먼트 클릭
  }, [fileInput]);  

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataURL = e.target.result;
      setSelectedImage(imageDataURL);
      setActiveTab("image");
    };
    reader.readAsDataURL(file);
  }, []);

  const menuProps = {
    activeTab,
    handleClickWebcamTab,
    handleClickImageTab,
  };

  const handleButtonImageLoad = async (imageURL) => {
    await setSelectedImage(imageURL);
    setActiveTab('image');
  };

  return (
    <div className="App">
      <Header/>
      <TabMenu {...menuProps} />
      <EmojiMenu handleButtonImageLoad={handleButtonImageLoad} />
      {activeTab === 'webcam' && <WebCamTab active={activeTab === 'webcam'} />}
      {activeTab === 'image' ? <ImageTab selectedImage={selectedImage} /> : null}

      <input
        ref={fileInput}
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default App;
