import { Producto } from "./Producto";

export class Categoria {

    constructor(
        public id: number,
        public nombre: string,
        public productos: Producto[]

    ){}
    
}