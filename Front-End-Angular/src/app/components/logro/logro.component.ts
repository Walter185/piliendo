import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogroService } from '../../_services/logro.service';
import { Logro } from 'src/app/model/logro.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-logro',
  templateUrl: './logro.component.html',
  styleUrls: ['./logro.component.css']
})
export class LogroComponent implements OnInit {

  public logros:Logro[]=[];
  public editLogro:Logro | undefined;
  public deleteLogro:Logro | undefined;
  currentUser: any;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  ShowUserBoard = false;
  showModeratorBoard = false;
  username: string;


  constructor(private logroService:LogroService, private tokenStorageService: TokenStorageService) { }
  
  ngOnInit(): void {
    this.getLogros();
    this.currentUser = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.ShowUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
  }
  public getLogros():void{
    this.logroService.getLogro().subscribe({
      next:(Response:Logro[])=>{
       this.logros=Response;
      },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    },
  });
  }
  public onOpenModal(mode:String, logro?:Logro):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addLogroModal');
    } else if(mode==='delete'){
      this.deleteLogro=logro;
      button.setAttribute('data-target','#deleteLogroModal');
    } else if (mode==='edit'){
      this.editLogro=logro;
      button.setAttribute('data-target','#editLogroModal');
    }
    container?.appendChild(button);
    button.click();
    }

    public onAddLogro(addForm:NgForm):void{
      document.getElementById('add-logro-form')?.click();
      this.logroService.addLogro(addForm.value).subscribe({
        next:(response:Logro) =>{
          console.log(response);
          this.getLogros();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  
  public onUpdateLogro(logro:Logro){
    this.editLogro=logro;
    document.getElementById('add-logro-form')?.click();
    this.logroService.updateLogro(logro).subscribe({
      next: ( response: Logro) =>{
        console.log(response);
        this.getLogros();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
    })
  }

  public onDeleteLogro(idLogro: number):void{
    this.logroService.deleteLogro(idLogro).subscribe({
    next: (response:void)=>{
        console.log(response);
        this.getLogros();
       },
       error:(error:HttpErrorResponse)=>{
      alert(error.message);
       }
     })
  }
}
