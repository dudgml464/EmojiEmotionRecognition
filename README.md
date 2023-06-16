# emoji-emotion-recognition
이미지와 웹캠을 통해 사용자의 감정을 분석하고 시각화하는 프로젝트입니다. 이 프로젝트는 face-api-arousal.js 라이브러리를 이용하여 감정을 분석하고, 분석 결과를 이모지로 전환하여 기쁨, 슬픔, 놀람, 화남, 역겨움, 두려움, 중립의 7개 라벨로 시각화합니다.

# 주요 기능
1. 웹캠 장치를 통한 실시간 감정 인식 및 시각화
2. 이미지 업로드를 통한 감정 인식 및 시각화
- 이모지 버튼을 이용한 테스트 이미지로 간편히 확인가능
3. 감정 라벨 별로 이모지로 표현

# 사용 방법
- 웹캠을 이용한 감정 인식: 웹캠 탭에서 웹캠 장치를 활성화하고, 실시간으로 감정을 인식하여 이모지로 표시합니다.

- 이미지를 이용한 감정 인식: 이미지 탭에서 사용자가 업로드한 이미지를 분석하여 감정을 인식하고, 이모지로 표시합니다.

각각의 라벨은 다음과 같은 감정 상태를 나타냅니다:
- Angry (화남)
- Disgusted (역겨움)
- Fearful (두려움)
- Happy (기쁨)
- Sad (슬픔)
- Surprised (놀람)
- Neutral (중립)

이 프로젝트는 감정 분석 및 시각화를 손쉽게 구현할 수 있는 멋진 툴입니다. 웹캠이나 이미지를 사용하여 감정 상태를 쉽게 인식하고, 결과를 다양한 이모지로 표현하여 사용자가 즉시 이해할 수 있도록 도와줍니다.

# 프로젝트 실행하기
git clone https://github.com/dudgml464/emoji-emotion-recognition.git

cd emoji-emotion-recognition

npm start

http://localhost:2023

# 빌드 방법
프로젝트를 빌드하려면 실행하십시오:
npm run build

# 빌드된 프로젝트 실행
dist폴더에서 index.html 파일을 실행하려면 http-server를 사용하십시오:
http-server dist

웹 브라우저를 열고 프로젝트를 확인하십시오:
http://localhost:8080# dudgml464.github.io.test-repo
