import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  toggleMenu() {
    const element = document.getElementById('mobile-nav');
    if (element) {
      this.isMenuOpen = !this.isMenuOpen;
      element.style.display = this.isMenuOpen ? 'flex' : 'none';
    }
  }
}
