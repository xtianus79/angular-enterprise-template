import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import './styles.scss';
import './styles.css';

if (process.env.ENV === 'production') {
  // enableProdMode();
}
// enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

