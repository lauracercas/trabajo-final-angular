import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPagarComponent } from '../modal-pagar/modal-pagar.component';
import { Categoria } from '../model/Categoria';
import { Producto } from '../model/Producto';
import { NotificationService } from '../notification/notification.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 categorias: Categoria[] = [];
 cesta: Producto[] = [];
 total = 0;
 categoriasView=false;

  constructor(public modalService: NgbModal, private notificationService : NotificationService) { }

  ngOnInit(): void {

    const cat = localStorage.getItem('categorias');
    this.categorias = cat !== null ? JSON.parse(cat) : [];
    
    this.categoriasView=this.categorias.length>0;

    this.obtenerCesta();

  }

  obtenerCesta(){
    this.cesta=[];
    this.total=0;
    for(var c of this.categorias){
      for(var p of c.productos){
        if(p.cesta>0){
          this.cesta.push(p);
          this.total+=p.precio*p.cesta
        }
      }
    }
  }


  addProducto(prod: Producto){

    for (var p of this.categorias.filter(c => c.nombre==prod.categoria)[0].productos){
      if(p.id==prod.id){
        p.cesta+=1;
      }
      
    }
    localStorage.setItem('categorias',JSON.stringify(this.categorias));

    this.obtenerCesta();


  }

  deleteProducto(prod: Producto){

    for (var p of this.categorias.filter(c => c.nombre==prod.categoria)[0].productos){
      if(p.id==prod.id){
        p.cesta=0;
      }
      
    }
    localStorage.setItem('categorias',JSON.stringify(this.categorias));

    this.obtenerCesta();

  }


  stockInCesta(stock: number): any[]{
    return new Array(stock);
  }


  changeSelect(prod:Producto, value:any ){
    for(var c of this.categorias){
      for(var p of c.productos){
        if(p.id==prod.id && p.categoria==prod.categoria){
          p.cesta=value;
        }
      }
    }

    localStorage.setItem('categorias',JSON.stringify(this.categorias));
    this.obtenerCesta();

  }


  pagar(){

    const modalRef = this.modalService.open(ModalPagarComponent, {size:'lg'});
    modalRef.result.then((result) => {
      this.notificationService.showSuccess("El pago se ha realizado con éxito", "Pago correcto");
      this.ngOnInit();

    }).catch((error) => {
      console.log(error);
    });
    
  }

}
