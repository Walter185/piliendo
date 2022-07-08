import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { HeadComponent } from './components/head/head.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectComponent } from './components/project/project.component';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SkillComponent } from './components/skill/skill.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IntroComponent } from './components/intro/intro.component';
import { HardskillComponent } from './components/hardskill/hardskill.component';
import { LogroComponent } from './components/logro/logro.component';
import { MenuComponent } from './components/menu/menu.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    FooterComponent,
    HeadComponent,
    ProjectComponent,
    ExperienceComponent,
    EducationComponent,
    SkillComponent,
    IntroComponent,
    HardskillComponent,
    LogroComponent,
    MenuComponent,
    IndexComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    NgbModule,
    NgCircleProgressModule.forRoot({})
  ],

  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }
