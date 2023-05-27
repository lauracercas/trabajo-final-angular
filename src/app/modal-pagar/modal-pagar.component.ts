import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pagar',
  templateUrl: './modal-pagar.component.html',
  styleUrls: ['./modal-pagar.component.css']
})
export class ModalPagarComponent implements OnInit {

  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    direccion: ['', Validators.required],
    codpostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    provincia: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    tarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
    fecexp: ['', Validators.required],
    cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
  });


  constructor(private activeModal: NgbActiveModal, private fb: FormBuilder) { }
  
  
  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }


  pagar() {

    if (this.form.valid) {
      const cat = localStorage.getItem('categorias');
      let categorias = cat !== null ? JSON.parse(cat) : [];
      for (var c of categorias) {
        for (var p of c.productos) {
          if (p.cesta > 0) {
            p.stock -= p.cesta;
            p.cesta = 0;
          }
        }
      }
      localStorage.removeItem('categorias');
      localStorage.setItem('categorias', JSON.stringify(categorias));

      this.closeModal();
    } else {
      this.validateAllFormFields(this.form); //{7}
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
