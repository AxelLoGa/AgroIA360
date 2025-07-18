import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonContent,  CommonModule, FormsModule]
})
export class HistoryPage {
  constructor() {
  addIcons({ timeOutline });
}
  history = [
    { date: '04/06', action: 'Watering Active', details: 'AI Recommended Irrigation.' },
    { date: '03/06', action: 'Watering Off ', details: 'Optimal Conditions.' },
    { date: '02/06', action: 'Watering Active', details: 'High Temperature.' },
  ];
}