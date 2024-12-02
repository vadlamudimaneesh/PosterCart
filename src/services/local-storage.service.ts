import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setMarketData (key: string,value: Object){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getMarketData (key: string){
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  clear(){
    localStorage.clear()
  }
}
