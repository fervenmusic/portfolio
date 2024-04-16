import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { LanguageService } from '../services/language-service.service';

@Component({
  selector: 'app-above-the-fold',
  templateUrl: './above-the-fold.component.html',
  styleUrls: ['./above-the-fold.component.scss'],
  animations: [
    trigger('smoothScroll', [
      transition(':enter', []),
      transition('* => *', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AboveTheFoldComponent {
  currentLanguage = 'english';

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage.subscribe(language => this.currentLanguage = language);
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
}
