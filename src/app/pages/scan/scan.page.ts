import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonButton, IonContent, CommonModule, FormsModule]
})
export class ScanPage {
  photoBase64?: string;

  constructor() { }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    this.photoBase64 = image.base64String;
  }
}
