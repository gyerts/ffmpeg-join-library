import { Injectable } from '@angular/core';
import { LogsDto } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  logs: LogsDto = {
    audios: [],
    videos: [],
  };

  constructor() {
    fetch('/assets/logs.json').then(async (res) => {
      this.logs = await res.json();
    });
  }
}
