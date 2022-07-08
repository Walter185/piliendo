import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HardskillService } from '../../_services/hardskill.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Hardskill } from '../../model/hardskill.model';

@Component({
  selector: 'app-hardskill',
  templateUrl: './hardskill.component.html',
  styleUrls: ['./hardskill.component.css'],
  
})

export class HardskillComponent implements OnInit {
  
  public hardskills:Hardskill[]=[];
  public editHardskill:Hardskill | undefined;
  public deleteHardskill:Hardskill | undefined;
  currentUser: any;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  ShowUserBoard = false;
  username: string;

  constructor(private hardskillService:HardskillService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getHardskills();
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
  
  public getHardskills():void{
    this.hardskillService.getHardskill().subscribe({
      next:(Response:Hardskill[])=>{
       this.hardskills=Response;
      },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
  }
  public onOpenModalHard(mode:String, hardskill?:Hardskill):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addHardskillModal');
    } else if(mode==='delete'){
      this.deleteHardskill=hardskill;
      button.setAttribute('data-target','#deleteHardskillModal');
    } else if (mode==='edit'){
      this.editHardskill=hardskill;
      button.setAttribute('data-target','#editHardskillModal');
    }
    container?.appendChild(button);
    button.click();
    }

    public onAddHardskill(addForm:NgForm):void{
      document.getElementById('add-hardskill-form')?.click();
      this.hardskillService.addHardskill(addForm.value).subscribe({
        next:(response:Hardskill) =>{
          console.log(response);
          this.getHardskills();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  
  public onUpdateHardskill(hardskill:Hardskill){
    this.editHardskill=hardskill;
    document.getElementById('add-hardskill-form')?.click();
    this.hardskillService.updateHardskill(hardskill).subscribe({
      next: ( response: Hardskill) =>{
        console.log(response);
        this.getHardskills();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
    })
  }

  public onDeleteHardskill(idHardskill: number):void{
    this.hardskillService.deleteHardskill(idHardskill).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getHardskills();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
    })
  }


}