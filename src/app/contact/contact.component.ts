import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { LanguageService } from '../services/language-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
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
export class ContactComponent implements AfterViewInit {
  nameError: string = '';
  emailError: string = '';
  messageError: string = '';
  isMessageSent: boolean = false;
  isChecked = false;
  checkboxImage = '/assets/img/check_box_outline_blank.png';

  @ViewChild('myForm') myForm: ElementRef | undefined;
  @ViewChild('nameField') nameField: ElementRef | undefined;
  @ViewChild('emailField') emailField: ElementRef | undefined;
  @ViewChild('messageField') messageField: ElementRef | undefined;
  @ViewChild('sendButton') sendButton: ElementRef | undefined;

  currentLanguage = 'english';

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage.subscribe(language => this.currentLanguage = language);
  }

  switchLanguage() {
    this.languageService.switchLanguage();
  }

  ngAfterViewInit() {
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      this.checkboxImage = '/assets/img/check_box.png';
    } else {
      this.checkboxImage = '/assets/img/check_box_outline_blank.png';
    }
  }

  async sendMail() {
    if (
      this.nameField &&
      this.messageField &&
      this.emailField &&
      this.sendButton
    ) {
      let nameField = this.nameField.nativeElement;
      let messageField = this.messageField.nativeElement;
      let emailField = this.emailField.nativeElement;
      let sendButton = this.sendButton.nativeElement;
      nameField.disabled = true;
      messageField.disabled = true;
      emailField.disabled = true;
      sendButton.disabled = true;

      let fd = new FormData();
      fd.append('name', nameField.value);
      fd.append('email', emailField.value);
      fd.append('message', messageField.value);

      try {
        await fetch('https://horlitzdeveloper.de/send_mail.php', {
          method: 'POST',
          body: fd,
        });

        setTimeout(() => {
          nameField.disabled = false;
          messageField.disabled = false;
          emailField.disabled = false;
          sendButton.disabled = false;
          this.resetForm();
        }, 3000);
      } catch (error) {
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
      }
    }
  }

  validateName(event: Event): void {
    const nameInput = (event.target as HTMLInputElement).value.trim();

    if (!nameInput) {
      this.nameError = 'Your name is required.';
      this.changeColor('name');
    } else if (!/^[a-zA-Z\s]+$/.test(nameInput)) {
      this.nameError = 'Please use letter. Your name is required.';
      this.changeColor('name');
    } else {
      this.nameError = '';
      this.changeColorBack('name');
    }
  }

  validateEmail(event: Event): void {
    const emailInput = (event.target as HTMLInputElement).value.trim();

    if (!emailInput) {
      this.emailError = 'Your email is required.';
      this.changeColor('email');
    } else if (!this.isValidEmail(emailInput)) {
      this.emailError = 'Invalid email format.';
      this.changeColor('email');
    } else {
      this.emailError = '';
      this.changeColorBack('email');
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  validateMessage(event: Event): void {
    const messageInput = (event.target as HTMLTextAreaElement).value.trim();

    if (!messageInput) {
      this.messageError = 'Your message is empty.';
      this.changeColor('growable-input');
    } else {
      this.messageError = '';
      this.changeColorBack('growable-input');
    }
  }

  submitForm(event: Event): void {
    event.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const messageInput = document.getElementById(
      'growable-input'
    ) as HTMLTextAreaElement;

    this.validateName({ target: nameInput } as unknown as Event);
    this.validateEmail({ target: emailInput } as unknown as Event);
    this.validateMessage({ target: messageInput } as unknown as Event);

    if (!this.nameError && !this.emailError && !this.messageError) {
      this.isMessageSent = true;
      this.sendMail();
    }
  }

  changeColor(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.style.border = 'solid 2px #E61C40';
      this.falseIcon(id);
    }
  }

  changeColorBack(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.style.border = 'solid 2px #70E61C';
      this.checkIcon(id);
    }
  }

  checkIcon(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.style.backgroundImage = 'url(./assets/img/check-form.svg)';
      element.style.backgroundPositionX = '96%';
      element.style.backgroundPositionY = 'center';
      element.style.backgroundRepeat = 'no-repeat';
    }
  }

  falseIcon(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.style.backgroundImage = 'url(./assets/img/attention-form.svg)';
      element.style.backgroundPositionX = '96%';
      element.style.backgroundPositionY = 'center';
      element.style.backgroundRepeat = 'no-repeat';
    }
  }

  resetForm() {
    this.isMessageSent = false;
    this.nameError = '';
    this.emailError = '';
    this.messageError = '';
    this.isChecked = false;
    this.checkboxImage = '/assets/img/check_box_outline_blank.png';

    if (this.nameField && this.emailField && this.messageField) {
      this.nameField.nativeElement.value = '';
      this.emailField.nativeElement.value = '';
      this.messageField.nativeElement.value = '';
    }

    this.resetBorderAndBackground('name');
    this.resetBorderAndBackground('email');
    this.resetBorderAndBackground('growable-input');
  }

  resetBorderAndBackground(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.style.border = 'solid 2px #9747FF';
      element.style.backgroundImage = 'none';
    }
  }
}
