import { Component, OnInit } from '@angular/core';
import { Softskill } from '../../model/softskill.model';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SoftskillService } from '../../_services/softskill.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
  
})

export class SkillComponent implements OnInit {
  
  public softskills:Softskill[]=[];
  public editSoftskill:Softskill | undefined;
  public deleteSoftskill:Softskill | undefined;
  currentUser: any;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  ShowUserBoard = false;
  username: string;

  constructor(private softskillService: SoftskillService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getSoftskills();
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
  public getSoftskills():void{
    this.softskillService.getSoftskill().subscribe({
      next:(Response:Softskill[])=>{
       this.softskills=Response;
      },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
  }
  public onOpenModal(mode:String, softskill?:Softskill):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addSoftskillModal');
    } else if(mode==='delete'){
      this.deleteSoftskill=softskill;
      button.setAttribute('data-target','#deleteSoftskillModal');
    } else if (mode==='edit'){
      this.editSoftskill=softskill;
      button.setAttribute('data-target','#editSoftskillModal');
    }
    container?.appendChild(button);
    button.click();
    }

    public onAddSoftskill(addForm:NgForm):void{
      document.getElementById('add-softskill-form')?.click();
      this.softskillService.addSoftskill(addForm.value).subscribe({
        next:(response:Softskill) =>{
          console.log(response);
          this.getSoftskills();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  
  public onUpdateSoftskill(softskill:Softskill){
    this.editSoftskill=softskill;
    document.getElementById('add-softskill-form')?.click();
    this.softskillService.updateSoftskill(softskill).subscribe({
      next: ( response: Softskill) =>{
        console.log(response);
        this.getSoftskills();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
    })
  }

  public onDeleteSoftskill(idSoftskill: number):void{
    this.softskillService.deleteSoftskill(idSoftskill).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getSoftskills();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
    })
  }
}