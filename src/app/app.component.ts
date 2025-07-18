import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {Router} from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, ReactiveFormsModule],
})
export class AppComponent {
  constructor(private router: Router) {
    const token = localStorage.getItem('token');

    if(!token){
      this.router.navigate(['/login']);
    }
  }
}
