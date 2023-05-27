import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    private admin: BehaviorSubject<string>;
    private categorias: BehaviorSubject<boolean>;

    constructor() {
      this.admin = new BehaviorSubject<string>('');
      this.categorias = new BehaviorSubject<boolean>(false);

    }

    setValue(newValue: string): void {
        this.admin.next(newValue);
      }

      getValue(): Observable<string> {
        return this.admin.asObservable();
      }

      setCategorias(newValue: boolean): void {
        this.categorias.next(newValue);
      }

      getCategorias(): Observable<boolean> {
        return this.categorias.asObservable();
      }


}

    