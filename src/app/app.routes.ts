import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

export const routes: Routes = [
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'my-skills', component: MySkillsComponent },
    { path: 'portfolio', component: PortfolioComponent },
];
