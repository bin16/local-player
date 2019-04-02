import { Injectable } from '@angular/core';
import { Media } from './media.service'

enum PlayMode {
  'Order' = 'order',
  'Repeat' = 'repeat',
  'Repeat One' = 'repeat_one',
  'Random' = 'random',
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  mediaList: Media[] = []
  historyList: Media[] = []
  video: HTMLVideoElement
  _currentTime: number = 0
  _playMode: PlayMode = PlayMode.Order

  constructor() { 
    const video = document.createElement('video')
    video.ontimeupdate = () => {
      this._currentTime = video.currentTime
    }
    video.onended = () => {
      this.playNext()
    }

    this.video = video
  }

  loadMedia({ path, type }: Media) {
    const source = document.createElement('source')
    source.src = path
    source.type = type
    const oldSource = this.video.querySelector('source')
    if (!oldSource) {
      this.video.appendChild(source)
    } else {
      this.video.replaceChild(source, oldSource)
    }
    this.video.load()
  }
  playMediaList(list: Media[]) {
    this.mediaList = list.slice()
    this.playMedia(this.mediaList[0])
  }
  removeMedia(index: number) {
    this.mediaList.splice(index, 1)
  }
  removeHistory(index: number) {
    this.historyList.splice(index, 1)
  }
  pushMedia(media: Media) {
    this.mediaList.push(media)
  }
  playMedia(media: Media) {
    this.mediaList.unshift(media)
    this.loadMedia(media)
    this.video.play()
  }
  playFirst() {
    if (this.mediaList[0]) {
      this.loadMedia(this.mediaList[0])
      this.video.play()
    }
  }
  playNext() {
    const current = this.mediaList.shift()
    this.historyList.push(current)
    this.playFirst()
  }
  playPrevious() {
    const previous = this.historyList.pop()
    this.mediaList.unshift(previous)
    this.playFirst()
  }
  volumeUp() {
    this.volume += 0.05
  }
  volumeDown() {
    this.volume -= 0.05
  }
  forward() {
    this.currentTime += 5
  }
  rewind() {
    this.currentTime -= 3
  }
  play() {
    if (this.video.currentSrc && this.video.paused) {
      this.video.play()
    } else if (this.mediaList.length > 0) {
      this.playFirst()
    }
  }
  pause() {
    if (!this.video.paused) {
      this.video.pause()
    }
  }
  toggle() {
    if (this.paused) {
      this.play()
    } else {
      this.pause()
    }
  }
  get volume(): number {
    return this.video.volume
  }
  set volume(value: number) {
    if (value > 1) {
      value = 1
    } else if (value < 0) {
      value = 0
    }
  
    this.video.volume = value
  }
  get screen(): HTMLVideoElement {
    return this.video
  }
  get width(): number {
    return this.video.videoWidth
  }
  get height(): number {
    return this.video.videoHeight
  }
  get paused(): boolean {
    return !this.video.currentSrc || this.video.paused
  }
  get currentSrc(): string {
    return this.video.currentSrc
  }
  get currentTime(): number {
    return this._currentTime
  }
  set currentTime(time: number) {
    if (time > this.duration) {
      time = this.duration
    } else if (time < 0) {
      time = 0
    }
  
    this.video.currentTime = time
  }
  get duration() {
    return this.video.duration
  }
}
