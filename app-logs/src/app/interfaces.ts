export interface LogsDto {
  audios: AudioDto[],
  videos: VideoDto[],
}

export interface AudioDto {
  name: string
  duration: number
  videoPath: string
}

export interface VideoDto {
  name: string
  duration: number
}
