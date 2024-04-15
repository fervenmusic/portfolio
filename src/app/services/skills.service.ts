import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  skills: any = [
    {logo: '/assets/img/icons/angular-big.png',description: 'Angular'},
    {logo: '/assets/img/icons/typescript-big.png',description: 'Typescript'},
    {logo: '/assets/img/icons/javascript-big.png',description: 'Javascript'},
    {logo: '/assets/img/icons/html5-big.png',description: 'HTML5'},
    {logo: '/assets/img/icons/firebase-big.png',description: 'Firebase'},
    {logo: '/assets/img/icons/api-big.png',description: 'API'},
    {logo: '/assets/img/icons/css-big.png',description: 'CSS'},
    {logo: '/assets/img/icons/material-design-big.png',description: 'Material Design'},
    {logo: '/assets/img/icons/bootstrap.svg',description: 'Bootstrap'},
    {logo: '/assets/img/icons/git.png',description: 'GIT'},
    {logo: '/assets/img/icons/scrum.png',description: 'Scrum'},
    {logo: '/assets/img/icons/wordpress.png',description: 'WordPress'}
  ]

  constructor() { }

  

  getSkills() {
    return this.skills;
  }
}
