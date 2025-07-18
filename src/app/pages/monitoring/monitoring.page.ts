import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonRefresher } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.page.html',
  styleUrls: ['./monitoring.page.scss'],
  standalone: true,
  imports: [ IonCardContent, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, ]
})
export class MonitoringPage implements OnInit {
  temperatura?: number;
  humedadSuelo?: number;
  phSuelo?: number;
  humedad: any;
  humedadTierra: any;

  constructor(private api: ApiService) {
  addIcons({ homeOutline });
}
  ngOnInit(): void {
    this.api.getTemperatura().subscribe(data => {
      this.temperatura = parseFloat(data.temperatura[0].temperatura);
    });
  }

  loadDatos() {
    this.api.getTemperatura().subscribe(data => {
      if (data && data.temperatura && data.temperatura.length > 0) {
        this.temperatura = parseFloat(data.temperatura[0].temperatura);
      } else {
        console.error('Respuesta inesperada:', data);
      }
    });

    this.api.getHumedad().subscribe(data => {
      if (data && data.humedad && data.humedad.length > 0) {
        this.humedad = parseFloat(data.humedad[0].humedad);
      } else {
        console.error('Respuesta inesperada:', data);
      }
    });

    this.api.getHumedadTierra().subscribe(data => {
      if (data && data.humedad_tierra && data.humedad_tierra.length > 0) {
        this.humedadTierra = parseFloat(data.humedad_tierra[0].humedad_tierra);
      } else {
        console.error('Respuesta inesperada:', data);
      }
    });
  }
}