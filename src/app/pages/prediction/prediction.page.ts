import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.page.html',
  styleUrls: ['./prediction.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PredictionPage {
  constructor() {
  addIcons({ homeOutline });
}
  recommendation = 'Riego necesario en las próximas 3 horas';
  risk = 'Alta posibilidad de enfermedad detectada';
  explanation = 'pH bajo + humedad alta';
}
