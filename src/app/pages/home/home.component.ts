import {Component, OnInit} from '@angular/core';
import * as faceapi from 'face-api.js';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  ngOnInit() {
    this.loadModels();
  }

  async loadModels(){
    await faceapi.nets.tinyFaceDetector.loadFromUri('models');
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
