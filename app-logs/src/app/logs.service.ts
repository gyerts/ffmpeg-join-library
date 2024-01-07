import { Injectable } from '@angular/core';
import { LogsDto } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  logs: LogsDto = {
    audios: [],
    videos: [],
    mainVideo: '',
    loading: '',
  };

  constructor() {
    this.fetch(null);

    const interval = setInterval(() => {
      this.fetch(interval);
    }, 2000);
  }

  fetch(interval: any) {
    fetch('/assets/logs.json').then(async (res) => {
      this.logs = await res.json();
      if (this.logs.mainVideo) {
        clearInterval(interval);
      }
    });
  }
}
