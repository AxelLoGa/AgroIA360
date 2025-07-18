import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { registerAppIcons } from './app/icons';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { Storage } from '@ionic/storage-angular';

registerAppIcons();

async function setupApp() {
  const storage = new Storage();
  await storage.create();

  bootstrapApplication(AppComponent, {
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      provideIonicAngular(),
      provideRouter(routes, withPreloading(PreloadAllModules)),
      provideHttpClient(),
      // Si usas el storage como provider, puedes colocarlo aquí
      { provide: Storage, useValue: storage }
    ]
  });
}

setupApp();