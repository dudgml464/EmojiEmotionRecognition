
# Emoji Emotion Recognition 사이트
이미지와 웹캠을 통해 사용자의 감정을 분석하고 시각화하는 프로젝트입니다. 이 프로젝트는 face-api-arousal.js 라이브러리를 이용하여 감정을 분석하고, 분석 결과를 이모지로 전환하여 기쁨, 슬픔, 놀람, 화남, 역겨움, 두려움, 중립의 7개 라벨로 시각화합니다.

# 주요 기능
1. 웹캠 장치를 통한 실시간 감정 인식 및 시각화
2. 이미지 업로드를 통한 감정 인식 및 시각화
3. 이모지 버튼을 이용한 테스트 이미지로 간편히 확인가능
4. 감정 라벨 별로 이모지를 이용한 감정 시각화

카메라를 이용한 감정 인식: 카메라 탭에서 웹캠 장치를 활성화하고, 실시간으로 분석하여 감정을 인식하고, 이모지로 표시합니다.

이미지를 이용한 감정 인식: 이미지 탭에서 사용자가 업로드한 이미지를 분석하여 감정을 인식하고, 이모지로 표시합니다.

이모지 버튼을 이용한 감정 인식 테스트: 손쉽게 이모지 버튼을 클릭하여 이미지 분석하여 감정을 인식하고, 이미지로 표시합니다.

각각의 라벨은 다음과 같은 감정 상태를 나타냅니다:
- 화남[Angry]
- 역겨움[Disgusted]
- 두려움[Fearful]
- 기쁨[Happy]
- 슬픔[Sad]
- 놀람[Surprised]
- 중립[Neutral]

이 프로젝트는 감정 분석 및 시각화를 이모지를 이용하여 구현한 사이트입니다. 카메라나 이미지를 사용하여 감정 상태를 인식하고, 결과를 다양한 이모지로 표현하여 사용자가 즉시 이해할 수 있도록 도와줍니다.

# Emoji Emotion Recognition 사이트 이동하기
https://dudgml464.github.io

# 프로젝트 실행하기
- 프로젝트 다운로드

    git clone https://github.com/dudgml464/emoji-emotion-recognition.git

- 프로젝트 이동

    cd emoji-emotion-recognition

- npm install

    npm i

- 실행

    npm start

- 결과

    http://localhost:2023

# 빌드된 프로젝트 실행 [dist폴더] 
- 실행

    http-server dist

- 결과

    http://localhost:8080
