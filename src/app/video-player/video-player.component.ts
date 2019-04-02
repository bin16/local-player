import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { VideoService } from '../video.service';
import { MediaService, Media } from '../media.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  paths: Media[]
  current: string

  paper: HTMLCanvasElement

  constructor(private video: VideoService, private media: MediaService, private el: ElementRef) { }

  ngOnInit() {
    const canvas = this.el.nativeElement.querySelector('canvas')
    this.paper = canvas
    this.drawVideo()
    this.readPath()
  }

  pushMedia(media: Media) {
    const item = {
      ...media,
      path: `http://localhost:8080/${media.path}`
    }
    this.video.pushMedia(item)
  }
  playMedia(media: Media) {
    const item = {
      ...media,
      path: `http://localhost:8080/${media.path}`
    }

    this.video.playMedia(item)
  }
  readPath(path = '/media/') {
    this.current = path
    this.media.readPath(path).subscribe(items => {
      this.paths = items
    })
  }
  get upPath() {
    return this.current.replace(/\/[^\/]+\/?$/, '') || '/media/'
  }

  @HostListener('document:keyup', ['$event'])
  onKeyup(event) {
    event.preventDefault()
    switch(event.keyCode) {
      case 32:
        this.video.toggle()
        return
      case 37:
        this.video.rewind()
        return
      case 39:
        this.video.forward()
        return
      case 38:
        this.video.volumeUp()
        return
      case 40:
        this.video.volumeDown()
        return
    }
  }

  toggleFullscreen() {
    const target = this.el.nativeElement.querySelector('.ply-content')
    target.requestFullscreen()
  }

  drawVideo() {
    const ctx = this.paper.getContext('2d')
    const player = this
    const draw = () => {
      const { screen, width, height } = player.video
      if (!player.paused) {
        if (player.paper.width !== width || player.paper.height !== height) {
          player.paper.width = width
          player.paper.height = height
        }
        ctx.drawImage(screen, 0, 0, width, height)
      }

      requestAnimationFrame(draw)
    }

    draw()
  }

  setCurrentTime(time: number) {
    if (!this.video.currentSrc) {
      return
    }

    this.video.currentTime = time
  }

  get paused():boolean {
    return this.video.paused
  }

  get currentTime():number {
    return this.video.currentTime || 0
  }

  get duratation(): number {
    return this.video.duration || 1
  }

  get volume():number {
    return Math.round(this.video.volume * 100)
  }

  get currentSrc():string {
    return this.video.currentSrc
  }
}
