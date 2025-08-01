import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { PredictionService, prediccion } from 'src/app/services/prediction.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.page.html',
  styleUrls: ['./prediction.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule]
})
export class PredictionPage {
  predictions: prediccion[] = [];

  constructor(private predictionService: PredictionService) { 
  this.predictions = this.predictionService.obtenerTodas();
  }
  ngOnInit() {
  this.predictions = this.predictionService.obtenerTodas();
  console.log('Predicciones cargadas:', this.predictions);
}
}

