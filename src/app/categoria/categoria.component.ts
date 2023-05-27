import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Categoria } from '../model/Categoria';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  form: FormGroup = this.fb.group({
    nombre: new FormControl('',[
      Validators.required])
  });

  error=''

  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private notificationService : NotificationService) { }

  ngOnInit(): void {
  }



  guardarCategoria(){
    let nombre = this.form.value.nombre;

    if (this.form.valid) {
      const cat = localStorage.getItem('categorias');
      let categorias = cat !== null ? JSON.parse(cat) : [];
  
      let id = categorias.length +1
  
  
      let categoria = new Categoria(id, nombre, []);
      categorias.push(categoria);
      localStorage.setItem('categorias',JSON.stringify(categorias));
      this.appService.setCategorias(true);
      this.notificationService.showSuccess("La categoria se ha guardado correctamente", "Guardado correcto");
      this.router.navigate(['/']);
    }else{
      this.form.controls['nombre'].markAsTouched({ onlySelf: true });
    }

    

  }

}
