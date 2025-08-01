import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonCardContent, IonCard, IonButton
} from '@ionic/angular/standalone';
import {
  Camera, CameraDirection, CameraResultType, CameraSource
} from '@capacitor/camera';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PredictionService } from 'src/app/services/prediction.service';

const OPENAI_API_KEY = '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';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [
    IonCardContent, IonCard, IonButton,
    IonContent, CommonModule, FormsModule
  ]
})
export class ScanPage {
  photoBase64?: string;
  diagnosis?: string;
  recomendations?: string[];
  risk?: string;

  isLoading = false;

  constructor(
    private http: HttpClient,
    private predictionService: PredictionService
  ) { }

async takePhoto() {
  this.isLoading = true;

  const image = await Camera.getPhoto({
    quality: 80,
    resultType: CameraResultType.Base64,
    source: CameraSource.Camera,
    direction: CameraDirection.Rear
  });

  this.photoBase64 = image.base64String;

  this.sendToPredictionAPI();
}

  formatJSON(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  sendToPredictionAPI() {
    if (!this.photoBase64) return;

    this.isLoading = true;

    const cleanBase64 = this.photoBase64.replace(/^data:image\/\w+;base64,/, '');
    const blob = this.base64ToBlob(cleanBase64, 'image/jpeg');
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('image', file);

    this.http.post<any>('https://web-production-d753b.up.railway.app/predict', formData).subscribe({
      next: (res) => {
        const rawDiagnosis = res.predicted_class_name?.trim();
        this.consultarOpenAI(rawDiagnosis);
      },
      error: () => {
        this.diagnosis = 'Error al procesar la imagen';
        this.isLoading = false;
      }
    });
  }

  consultarOpenAI(diagnosisText: string) {
    const prompt = `
Diagnóstico: "${diagnosisText}". Resume el problema de la planta en una oración.

Devuelve exclusivamente un JSON válido con tres claves obligatorias:
- problema
- riesgo
- recomendacion

No agregues explicaciones fuera del JSON. Asegúrate de cerrar correctamente la estructura JSON.
`;

    const body = {
      model: "gpt-3.5-turbo",
      max_tokens: 300,
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }]
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    });

    this.http.post<any>('https://api.openai.com/v1/chat/completions', body, { headers }).subscribe({
      next: (chatRes) => {
        const respuesta: string = chatRes.choices[0].message.content;

        // Validación rápida si la respuesta está truncada
        if (!respuesta.trim().endsWith('}') || (respuesta.match(/"/g)?.length ?? 0) < 6) {
          console.warn('Respuesta truncada o incompleta:', respuesta);
          this.diagnosis = respuesta;
          this.recomendations = [];

          this.predictionService.guardar({
            imagen: this.photoBase64!,
            diagnostico: respuesta,
            recomendaciones: [],
            riesgo: 'desconocido',
            fecha: new Date().toLocaleString()
          });

          this.isLoading = false;
          return;
        }

        try {
          const interpretacion = JSON.parse(respuesta);

          const problema = interpretacion.problema ?? 'Problema no definido';
          const riesgo = interpretacion.riesgo ?? 'Riesgo no especificado';
          const recomendacion = interpretacion.recomendacion ?? 'Sin recomendación disponible';

          this.diagnosis = problema;
          this.risk = riesgo;
          this.recomendations = recomendacion;
          
          this.recomendations = [recomendacion];         

          this.predictionService.guardar({
            imagen: this.photoBase64!,
            diagnostico: problema,
            recomendaciones: [recomendacion],
            riesgo,
            fecha: new Date().toLocaleString()
          });

        } catch (e) {
          console.error('Error al parsear JSON:', respuesta);

          this.diagnosis = respuesta;
          this.recomendations = [];

          this.predictionService.guardar({
            imagen: this.photoBase64!,
            diagnostico: respuesta,
            recomendaciones: [],
            riesgo: 'desconocido',
            fecha: new Date().toLocaleString()
          });
        }

        this.isLoading = false;
      },
      error: (e) => {
        console.error('Error al consultar OpenAI', e);
        this.diagnosis = 'Error al generar diagnóstico';
        this.isLoading = false;
      }
    });
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
}