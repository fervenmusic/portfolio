import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private language = new BehaviorSubject<string>('english');
  currentLanguage = this.language.asObservable();

  constructor() { }

  switchLanguage() {
    const languageImage = document.querySelector('.language');
  if (languageImage) {
    languageImage.classList.add('rotate');
    setTimeout(() => {
      languageImage.classList.remove('rotate');
    }, 500); 
  }
    this.language.next(this.language.value === 'english' ? 'german' : 'english');
  }
}
