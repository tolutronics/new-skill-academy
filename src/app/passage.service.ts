import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassageService {
  private destn1: any;
  private rem: any;
  private destn2: any;
  private destn3 = {} as any;
  private destn4 = {} as any;
  constructor() { }

  public setRem(rem) {
    this.rem = rem;
   // this.destn2 = destn2;
  }
  public setDestn(destn1) {
    this.destn1 = destn1;
   // this.destn2 = destn2;
  }

   public setDestn2(destn2) {
    this.destn2 = destn2;

  }

  public setDestn3(destn3) {
    this.destn3 = destn3;

  }

  public setDestn4(destn4) {
    this.destn4 = destn4;

  }

  getDestn1() {
    return this.destn1;
  }
  getRem() {
    return this.rem;
  }

  getDestn2() {
    return this.destn2;
  }

  getDestn3() {
    return this.destn3;
  }

  getDestn4() {
    return this.destn4;
  }
}
