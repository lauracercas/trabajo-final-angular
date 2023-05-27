export class Producto {

    constructor(
        public id: number,
        public categoria: string,
        public nombre: string,
        public codigo: string,
        public descripcion: string,
        public precio: number,
        public stock: number,
        public cesta: number,
        public imagen: string
    ) { }
}