import { Injectable } from '@angular/core';

export interface prediccion {
  imagen: string;
  diagnostico: string;
  recomendaciones: string[];
  riesgo: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private predicciones: prediccion[] = [];

  guardar(prediccion: prediccion) {
    this.predicciones.unshift(prediccion);
  }

  obtenerTodas(): prediccion[] {
    return this.predicciones;
  }
}