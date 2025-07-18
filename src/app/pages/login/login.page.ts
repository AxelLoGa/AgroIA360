import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonLabel,IonInput, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicStorageModule, ReactiveFormsModule, RouterModule]
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
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
}
