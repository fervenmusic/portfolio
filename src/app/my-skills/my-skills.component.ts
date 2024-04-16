import { Component } from '@angular/core';
import { LanguageService } from '../services/language-service.service';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent {
  currentLanguage = 'english';

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage.subscribe(language => this.currentLanguage = language);
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }
}
