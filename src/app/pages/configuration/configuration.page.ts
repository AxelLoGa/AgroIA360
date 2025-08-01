import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader } from '@ionic/angular/standalone';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfigurationPage implements OnInit {

  constructor() { }

  nombre: string = '';

  ngOnInit() {
    const nombreGuardado = localStorage.getItem('nombre');
    this.nombre = nombreGuardado && nombreGuardado !== 'undefined'
      ? nombreGuardado
      : 'Usuario';
  }
  
    logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    window.location.href = '/login'; // 🔄 O usa this.router.navigate(['/login']) si tienes Router inyectado
  }

}
