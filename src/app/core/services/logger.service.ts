import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  info(message: any){
    window.electronAPI.logMessage('info', message);
  }

  error(message: any){
    window.electronAPI.logMessage('error', message);
  }

  debug(message: any){
    window.electronAPI.logMessage('debug', message);
  }
}
