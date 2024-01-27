import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';


@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  
  private _ls = new SecureLS({encodingType: 'aes', isCompression: false});
  constructor() {
  }

  set(key: string, value: any, expired: number = 0) {
    this._ls.set(key, value);
  }

  remove(key: string) {
    this._ls.remove(key);
  }

  get(key: string) {
    return this._ls.get(key);
  }

  clear() {
    this._ls.removeAll();
  }
}
