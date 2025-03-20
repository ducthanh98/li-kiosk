import {Component, OnInit, Provider} from '@angular/core';
import * as faceapi from 'face-api.js';
import {LoggerService} from "../../core/services/logger.service";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers:[LoggerService as Provider]
})
export class HomeComponent implements OnInit{
  constructor(private  loggerService: LoggerService) {
  }

  ngOnInit() {
    this.loadModels();
  }

  async loadModels(){
    await faceapi.nets.tinyFaceDetector.loadFromUri('models');
    this.loggerService.info("Load model successfully")

  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      const videoElement = document.getElementById('camera-preview') as HTMLVideoElement;
      videoElement.srcObject = stream;
      await videoElement.play();
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  }

  async countFaces() {
    const videoElement = document.getElementById('camera-preview') as HTMLVideoElement;

    const detections = await faceapi.detectAllFaces(
        videoElement,
        new faceapi.TinyFaceDetectorOptions()
    ).run();
    console.log(detections)
    return detections.length;
  }

}
