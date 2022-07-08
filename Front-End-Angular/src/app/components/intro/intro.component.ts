import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { IntroService } from '../../_services/intro.service';
import { Intro } from 'src/app/model/intro.model';


@Component({

  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  
  public intros:Intro[]=[];
  public editIntro:Intro | undefined;
  private roles: string[];
  currentUser: any;
  isLoggedIn = false;
  showAdminBoard = false;
  ShowUserBoard = false;
  username: string;

  constructor(private introService:IntroService, private tokenStorageService:TokenStorageService) { }

  
  ngOnInit(): void {
    this.getIntros();
    this.currentUser = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.ShowUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
  }
  public getIntros():void{
    this.introService.getIntro().subscribe({
      next:(Response:Intro[])=>{
     this.intros=Response;
      },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
  }
  public onOpenModal(mode:String, intro?:Intro):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if (mode==='edit'){
      this.editIntro=intro;
      button.setAttribute('data-target','#editIntroModal');
    }
    container?.appendChild(button);
    button.click();
    }

     public onUpdateIntro(intro:Intro){
      this.editIntro=intro;
      document.getElementById('add-intro-form')?.click();
      this.introService.updateIntro(intro).subscribe({
        next: ( response: Intro) =>{
          console.log(response);
          this.getIntros();
         },
         error:(error:HttpErrorResponse)=>{
           alert(error.message);
         }
      })
    }

}
