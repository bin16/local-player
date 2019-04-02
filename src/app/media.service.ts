import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http';

export enum MediaType {
  mp3 = 'audio/mp3',
  mp4 = 'video/mp4',
}

export type Media = {
  title: string,
  path: string,
  type: MediaType,
  id?: number,
  poster?: string,
  dir?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  readPath(path = '/media/'): Observable<Media[]> {
    return this.http.get<Media[]>(`http://localhost:8080${path}`)
  }

  constructor(private http: HttpClient) { }
}
