import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisneyLandService {
  charectersSelected = new BehaviorSubject<any[]>([])
  charectersSelected$ :Observable<any> = this.charectersSelected.asObservable()

  constructor(
    private http: HttpClient
  ) { }

  private getCharectersUrl = "https://api.disneyapi.dev/character"

  getCharters():Observable<any>{
    return this.http.get(this.getCharectersUrl)
  }

  
}
