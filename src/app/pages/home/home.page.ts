import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';

// ✅ Importación correcta de todos los íconos necesarios
import {
  homeOutline,
  pulseOutline,
  scanOutline,
  bulbOutline,
  timeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class HomePage implements OnInit {

  nombre: string = '';

buttons = [
  { icon: 'pulse-outline', label: 'Monitoreo', link: '/monitoring' },
  { icon: 'scan-outline', label: 'Escanear Planta', link: '/scan' },
  { icon: 'bulb-outline', label: 'Predicción', link: '/prediction' },
  { icon: 'time-outline', label: 'Historial', link: '/history' },
];

  constructor() {
    addIcons({
      homeOutline,
      pulseOutline,
      scanOutline,
      bulbOutline,
      timeOutline
    });
  }

  ngOnInit() {
    const nombre = localStorage.getItem('nombre');
    this.nombre = nombre && nombre !== 'undefined' ? nombre : 'Usuario';
  }

}