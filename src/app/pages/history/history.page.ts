import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonSelectOption, IonLabel, IonSelect, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonLabel, IonItem, IonContent, CommonModule, FormsModule, NgChartsModule, IonSelectOption, IonSelect]
})
export class HistoryPage implements OnInit{

  chartTemperaturaData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  chartHumedadData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  chartHumedadSueloData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  }

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora de medicion'
        },
        ticks:{
          autoSkip: true,
          maxRotation: 45,
          minRotation: 20
        },
        grid:{
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'valor'
        },
        min:0
      }
    }
  };

  lineChartType: ChartType = 'line';

  constructor(private api: ApiService) {}

cantidadVisible: number | 'all' = 10;
medicionesOriginales: any[] = [];

  ngOnInit() {
    this.api.getMediciones().subscribe(data => {
      this.medicionesOriginales = data.mediciones;
      this.actualizarGrafico();
    });
  }

actualizarGrafico() {
  let medicionesFiltradas = [...this.medicionesOriginales];

  if (this.cantidadVisible !== 'all') {
    medicionesFiltradas = medicionesFiltradas.slice(0, this.cantidadVisible);
  }

  const fechas = medicionesFiltradas.map(d => d.hora.split(' ')[1].slice(0, 5));
  const temperatura = medicionesFiltradas.map(d => +d.temperatura);
  const humedad = medicionesFiltradas.map(d => +d.humedad_ambiente);
  const humedadTierra = medicionesFiltradas.map(d => +d.humedad_tierra);

  this.chartTemperaturaData = {
    labels: fechas,
    datasets: [{
      data: temperatura,
      label: 'Temperatura (°C)',
      borderColor: 'red',
      fill: false
    }]
  };

  this.chartHumedadData = {
    labels: fechas,
    datasets: [{
      data: humedad,
      label: 'Humedad (%)',
      borderColor: 'blue',
      fill: false
    }]
  };

  this.chartHumedadSueloData = {
    labels: fechas,
    datasets: [{
      data: humedadTierra,
      label: 'Humedad Suelo (%)',
      borderColor: 'green',
      fill: false
    }]
  };
}
}