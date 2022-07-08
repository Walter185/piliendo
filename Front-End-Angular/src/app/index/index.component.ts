import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
 
  nombreUsuario: string;


  constructor(private tokenStorageService:TokenStorageService) { }
  
  ngOnInit() {
    this.nombreUsuario = this.tokenStorageService.getUserName();
  }

}

