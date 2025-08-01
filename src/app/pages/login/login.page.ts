import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { IonInput } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    IonicStorageModule
  ]
  
})
  
export class LoginPage {
  correoLogin: string = '';
  password: string = '';

  @ViewChild('correoInput', { static: false }) correoInput!: IonInput;



  constructor(private auth: AuthService, private router: Router) {}


  ionViewDidEnter() {
    // Reintenta el enfoque si el input aún no está listo
    this.enfocarInputSeguro(10);
  }

      private enfocarInputSeguro(reintentos: number) {
      if (!this.correoInput || reintentos <= 0) {
        console.warn('No se pudo enfocar el input');
        return;
      }

      this.correoInput.getInputElement().then(input => {
        if (input) {
          input.focus();
          console.log('Input enfocado correctamente');
        } else {
          setTimeout(() => this.enfocarInputSeguro(reintentos - 1), 100);
        }
      }).catch(() => {
        setTimeout(() => this.enfocarInputSeguro(reintentos - 1), 100);
      });
    }




  onSubmit() {
    if (!this.correoLogin || !this.password) {
      alert('Por favor ingresa tu correo y contraseña');
      return;
    }

    this.auth.login({ email: this.correoLogin, password: this.password }).subscribe({
      next: async res => {
        console.log('Respuesta del backend:', res);
        await this.auth.setToken(res.token);
        localStorage.setItem('nombre', res.nombre || 'Usuario');
        this.router.navigate(['/home']);
      },
      error: () => alert('Correo o contraseña incorrectos')
    });
  }
}
