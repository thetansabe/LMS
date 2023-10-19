import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { RouterModule } from '@angular/router';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {

  //run a HLS video only
  hls: Hls = null!;
  src: string = 'http://localhost:4200/assets/videos/hls1/trungnguyen.m3u8';

  @ViewChild('media') media !: ElementRef;

  ngAfterViewInit() {
    if(this.hls){
      this.hls.destroy();
    }
    
    if(Hls.isSupported()){
      this.hls = new Hls();

      this.hls.attachMedia(this.media.nativeElement);

      this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log('video and hls.js are now bound together !');
        this.hls.loadSource(this.src);
        this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          console.log('manifest loaded, found ' + data.levels.length + ' quality level');
        });
      });

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
      console.log('hls is not supported');
    }
  }

  //ngxvideogular helpers
  api: VgApiService = new VgApiService();

  onPlayerReady(source: VgApiService) {
    this.api = source;
    this.api
      .getDefaultMedia()
      .subscriptions.loadedMetadata.subscribe(this.autoplay.bind(this));
  }

  autoplay() {
    this.api.play();
  }
}
