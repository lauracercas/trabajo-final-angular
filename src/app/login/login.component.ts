import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormControl, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logeado = true;
  usuario :any;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('')
  });
  

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
    
      
  }


  login(){
    let username= this.loginForm.value.username;
    console.log(this.loginForm.value)
    this.appService.setValue(username);
    localStorage.setItem('usuario',username);

    const cat = localStorage.getItem('categorias');
      let categorias = cat !== null ? JSON.parse(cat) : [];
      if(categorias.length>0){
        this.appService.setCategorias(true);
      }else{
        this.appService.setCategorias(false);
      }

      this.router.navigate(['/']);

  }


  logout(){
    localStorage.removeItem('usuario');
    this.appService.setValue('');
    this.router.navigate(['/']);

    }

  



}
