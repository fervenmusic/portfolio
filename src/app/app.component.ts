import { Component } from '@angular/core';
import { LanguageService } from './services/language-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  constructor(private languageService: LanguageService) { }

  switchLanguage() {
    this.languageService.switchLanguage();
  }
}
