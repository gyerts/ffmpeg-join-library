#!/usr/bin/env sh
echo "Run"

DUR_M1=21.816667
DUR_M2=27.133333

DUR_A1=12.456000
DUR_A2=7.176000
DUR_A3=7.200000

makeVideoLongAsAudio() {
  VIDEO=$1
  AUDIO=$2
  ./ffmpeg -i ${VIDEO} -i ${AUDIO} -c:v copy -c:a aac -strict experimental \
    -filter_complex "[1:a]apad" -shortest 1_final.mov
}

makeVideoShorter() {
  VIDEO=$1
  DURATION_SEC=$2
  VIDEO_DURATION_SEC=$(./ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${VIDEO})
  PTS=$((${DURATION_SEC} / ${VIDEO_DURATION_SEC}))
  echo ${DURATION_SEC}
  echo ${VIDEO_DURATION_SEC}
  echo ${PTS}
  ./ffmpeg -i ${VIDEO} -filter:v "setpts=${PTS}*PTS" output.mp4
}

concatVideoAndAudioWithDelayMs() {
  VIDEO=$1
  AUDIO=$2
  DELAY_MS=$3

  # Exists audio
  ./ffmpeg -i ${VIDEO} -i ${AUDIO} -filter_complex "[1:a]adelay=${DELAY_MS}|${DELAY_MS}[a2];[0:a][a2]amix=inputs=2" -c:v copy output2.mp4

  # No audio
#  ./ffmpeg -i ${VIDEO} -i ${AUDIO} -filter_complex "[1:a]adelay=${DELAY_MS}|${DELAY_MS}" -map 0:v -map 1:a -c:v copy output2.mp4
}

#makeVideoShorter './1.mov' 3
#makeVideoLongAsAudio './1.mov' './1.mp3';
#concatVideoAndAudioWithDelayMs './output.mp4' './1.mp3' 17000;
