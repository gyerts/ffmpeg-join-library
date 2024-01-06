import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LogsService } from "./logs.service";
import { NameOnlyPipe } from "./name-only.pipe";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NameOnlyPipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(protected logsService: LogsService) {
    document.addEventListener('scroll', () => {
      localStorage.setItem("scrollTop", `${document.body.scrollTop}`);
    });
    document.body.scrollTop = parseInt(localStorage.getItem("scrollTop") || '0');
  }

  coef = 30;
  videoSrc!: string;
  audioSrc!: string;
  root?: boolean;

  playAudio(name: string) {
    this.audioSrc = name;
  }

  playVideo(name: string, root?: boolean) {
    this.videoSrc = name;
    this.root = root;
  }

  hide() {
    this.videoSrc = '';
    this.audioSrc = '';
    this.root = undefined;
  }
}

// Исус христотс ты наш бог мы прекланяем пред тобой колени я раб твой,
// прости мне мои грехи, и прошу у тебя помощи о продаже квартиры.
// Слава отцу и сыну и святому духу ныне и присно во веки веков, аминь.
