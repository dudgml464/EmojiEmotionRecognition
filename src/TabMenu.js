import React, { useCallback, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faImage } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const TabMenu = ({
  activeTab,
  handleClickWebcamTab,
  handleClickImageTab,
}) => {
  // useCallback을 사용해 이벤트 핸들러 함수를 최적화
  const handleWebcamClick = useCallback(() => {
    handleClickWebcamTab();
  }, [handleClickWebcamTab]);

  const handleImageClick = useCallback(() => {
    handleClickImageTab();
  }, [handleClickImageTab]);

  return (
    <div className="menu">
      <button
        className={activeTab === "webcam" ? "tab-active" : ""}
        onClick={handleWebcamClick}
      >
        <FontAwesomeIcon className="MenuIcon" icon={faCameraRetro} size="2x" />
      </button>
      <button
        className={activeTab === "image" ? "tab-active" : ""}
        onClick={handleImageClick}
      >
        <FontAwesomeIcon className="MenuIcon" icon={faImage} size="2x" />
      </button>
    </div>
  );
};

// React.memo를 사용해 감싸주어 동일한 props가 전달될 경우 렌더링을 방지
export default memo(TabMenu);
