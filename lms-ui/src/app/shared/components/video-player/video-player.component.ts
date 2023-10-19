import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Hls from 'hls.js';
import Plyr from 'plyr';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  //run a HLS video only
  hls: Hls = null!;
  src: string = 'http://localhost:4200/assets/videos/hls1/trungnguyen.m3u8';

  @ViewChild('hlsPlayer') hlsPlayer!: ElementRef;

  defaultOptions: any = {};

  ngAfterViewInit() {
    if(this.hls){
      this.hls.destroy();
    }
    
    if(Hls.isSupported()){
      this.hls = new Hls();

      this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log('video and hls.js are now bound together !');
        this.hls.loadSource(this.src);
        this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          console.log('manifest loaded, found ' + data.levels.length + ' quality level');

          this.defaultOptions.controls = [
            'play-large',
            'restart',
            'rewind',
            'play',
            'fast-forward',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            // 'download',
            'fullscreen',
          ];

          new Plyr(this.hlsPlayer.nativeElement, this.defaultOptions);
        });
      });

      this.hls.attachMedia(this.hlsPlayer.nativeElement);

      this.hls.on(Hls.Events.ERROR, (event, data) => {
        console.log(data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
              console.log('fatal network error encountered, try to recover');
              this.hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('fatal media error encountered, try to recover');
              this.hls.recoverMediaError();
              break;
            default:
              // cannot recover
              this.hls.destroy();
              break;
          }
        }
      });
    }else{
      console.log('hls is not supported, try another web browser');
    }
  }
}
