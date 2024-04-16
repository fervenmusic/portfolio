import { Component } from '@angular/core';
import { LanguageService } from '../services/language-service.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  currentLanguage = 'english';

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage.subscribe(language => this.currentLanguage = language);
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }
}
