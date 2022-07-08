import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { IntroComponent } from './components/intro/intro.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillComponent } from './components/skill/skill.component';
import { ProjectComponent } from './components/project/project.component';
import { FooterComponent } from './components/footer/footer.component';
import { HardskillComponent } from './components/hardskill/hardskill.component';
import { LogroComponent } from './components/logro/logro.component';
import { IndexComponent } from './index/index.component';
import { LoginGuard } from '../app/guards/login.guard';
import { GuardService } from '../app/guards/guard.service';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'intro',  component: IntroComponent, canActivate: [GuardService] },
  { path: 'experience', component: ExperienceComponent, canActivate: [GuardService] },
  { path: 'education', component: EducationComponent , canActivate: [GuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'Skills', component: SkillComponent , canActivate: [GuardService] },
  { path: 'hard', component: HardskillComponent, canActivate: [GuardService] },
  { path: 'proyectos', component: ProjectComponent, canActivate: [GuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [GuardService] },
  { path: 'user', component: BoardUserComponent, canActivate: [GuardService] },
  { path: 'info', component: FooterComponent , canActivate: [GuardService] },
  { path: 'logro', component: LogroComponent, canActivate: [GuardService] },
  { path: 'admin', component: BoardAdminComponent, canActivate: [GuardService] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
