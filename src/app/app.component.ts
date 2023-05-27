import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { Categoria } from './model/Categoria';
import { Producto } from './model/Producto';
import { Usuario } from './model/Usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  categorias: Categoria[] = [];
  title:string ="";
  admin = false;
  login:string="Iniciar Sesión"
  categoria = false;
 
   constructor(
    private appService: AppService
    ) { }
 
   ngOnInit(): void {
     localStorage.removeItem('usuario');
    

    this.appService.getValue().subscribe((value) => {
      if(value=='' ){
        this.admin=false;
        this.login='Iniciar Sesión';
      }else if(value=='admin'){
        this.login="Cuenta";
        this.admin=true;
      }else if(value!='admin'){
        this.login="Cuenta";
        this.admin=false
      }


    });

    this.appService.getCategorias().subscribe((value) => {
      if(value ){
        this.categoria=true;
      }else {
        this.categoria=false;
      }


    });


    this.title="Titulo de la tienda"

    this.cargarDatosPrueba();
   }

  cargarDatosPrueba(){
    let funkos = [
      new Producto (1,"Funkos","Harry Potter","PROD-01","POP Harry Potter: Harry Potter (torneo de los tres magos)",13, 3,0,"https://www.lacasadelfriki.es/18611-38404-home_default/figura-pop-harry-potter-harry-potter-torneo-de-los-tres-magos-caja-exterior-un-poco-deteriorada.jpg"),
      new Producto(2,"Funkos","Capitán America","PROD-02","POP Marvel: Capitán América Avengers Endgame",19,3, 0, "https://www.lacasadelfriki.es/18603-38391-home_default/figura-pop-capitan-america-avengers-endgame-marvel.jpg"),
      new Producto(3,"Funkos","El juego del calamar","PROD-03","POP El Juego del Calamar (Squid Game): Masked Worker",16.10,1, 0, "https://www.lacasadelfriki.es/18557-38204-home_default/figura-pop-masked-worker-el-juego-del-calamar.jpg"),
      new Producto(4,"Funkos","Batman","PROD-04","POP DC: Batman",15,2, 0, "https://www.lacasadelfriki.es/18483-37969-home_default/figura-pop-batman-battle-ready-the-batman-dc.jpg"),
      new Producto(5,"Funkos","Russel Dug","PROD-05","POP Disney: Russel dug",14,4, 0, "https://www.lacasadelfriki.es/18327-37400-home_default/figura-pop-russell-dug-days-disney.jpg")

  ];
  let cuadernos = [
    new Producto(1,"Cuadernos","Harry Potter","PROD-01","Cuaderno A5 Harry Potter Mapa del merodeador",8.50,3, 0, "https://www.lacasadelfriki.es/18415-37738-home_default/cuaderno-tapa-forrada-a5-mapa-merodeador-harry-potter.jpg"),
    new Producto(2,"Cuadernos","Harry Potter Gafas","PROD-02","Cuaderno A5 Harry Potter Gadas y rayo",8.50,5, 0, "https://www.lacasadelfriki.es/18416-37741-home_default/cuaderno-tapa-forrada-a5-gafas-harry-potter.jpg"),
    new Producto(3,"Cuadernos","Ricky y Morty","PROD-03","Cuaderno A5 Ricky y Morty Nave",8,2, 0, "https://www.lacasadelfriki.es/18418-37747-home_default/cuaderno-tapa-forrada-a5-nave-rick-y-morty.jpg"),
    new Producto(4,"Cuadernos","La casa de papel","PROD-04","Cuaderno A5 La casa de papel",8.50,3, 0, "https://www.lacasadelfriki.es/18417-37744-home_default/cuaderno-tapa-forrada-a5-guerra-la-casa-de-papel.jpg")
  ];

  let tazas = [
    new Producto(1,"Tazas","Taza Mandalorian","PROD-01","Taza 3D Casco Mandaolorian Star Wars 350ml",17,3, 0, "https://www.lacasadelfriki.es/18455-37897-home_default/taza-3d-casco-mandalorian-star-wars-350-ml.jpg"),
    new Producto(2,"Tazas","Taza Thanos","PROD-02","Taza 3D Guante de Thanos Marvel 350ml",22,3, 0, "https://www.lacasadelfriki.es/15615-30114-home_default/taza-3d-guante-thanos-marvel-350-ml.jpg")
  ];
  let categorias = [
      new Categoria(1,"Funkos",  funkos),
      new Categoria(2,"Cuadernos",  cuadernos),
      new Categoria(3,"Tazas",  tazas)

  ];

  this.categorias=categorias;

    localStorage.setItem('categorias',JSON.stringify(this.categorias));
  }

  
}
