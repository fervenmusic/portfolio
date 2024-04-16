import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { LanguageService } from '../services/language-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
export class HeaderComponent {
  isMenuOpen: boolean = false;
  currentLanguage: string;

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage.subscribe(language => this.currentLanguage = language);
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const element = document.getElementById('mobile-nav');
    if (element) {
      element.style.display = this.isMenuOpen ? 'flex' : 'none';
    }
  }
  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
}
