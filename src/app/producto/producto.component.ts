import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from '../model/Categoria';
import { Producto } from '../model/Producto';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  form: FormGroup = this.fb.group({
    nombreProducto: ['',Validators.required],
    codigo: ['',Validators.required],
    categoria: ['',Validators.required],
    descripcion: ['',Validators.required],
    precio: ['',[Validators.required, Validators.min(1)]],
    stock: ['',[Validators.required, Validators.min(1)]],
    imagen: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
  });


  categorias: Categoria[] = [];

  viewImg=false;

  img='';

  constructor(private fb: FormBuilder, private router: Router, private notificationService : NotificationService) { }

  ngOnInit(): void {
    const cat = localStorage.getItem('categorias');
    this.categorias = cat !== null ? JSON.parse(cat) : [];


  }

  verImagen(){
    if(this.form.controls['imagen'].valid){
      this.viewImg=true;
      this.img=this.form.value.imagen;
    }else{
      this.form.controls['imagen'].markAsTouched({ onlySelf: true });
    }
  }

  guardarProducto(){
    if (this.form.valid) {

      for( let c of this.categorias){
        if(c.id.toString() === this.form.value.categoria){
          let producto = new Producto((c.productos.length + 1),
            c.nombre,
            this.form.value.nombre,
            this.form.value.codigo,
            this.form.value.descripcion,
            this.form.value.precio,
            this.form.value.stock,
            0,
            this.form.value.imagen
           )
           c.productos.push(producto);
           localStorage.setItem('categorias',JSON.stringify(this.categorias));
           this.notificationService.showSuccess("El producto se ha guardado correctamente", "Guardado correcto");
           this.router.navigate(['/']);
        }
      }
    } else {
      this.validateAllFormFields(this.form); 
    }
    
  }

  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }

}
