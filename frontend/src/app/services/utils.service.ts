import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  generateID():string {
    return Math.random().toString(32).substring(2) + Date.now().toString(32)
  }

  getCurrentDate():string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  getDataPerson(){
    return JSON.parse(localStorage.getItem('person'));
  }

  getFreeDays():any {
    const { created } = this.getDataPerson();
    const daysLimit = 30; // Definir aquí la cantidad de días que se quieran dar gratis
    const currentDate = new Date();
    const elapsedTime = currentDate.getTime() - new Date(created).getTime();
    return Math.max(daysLimit - Math.floor(elapsedTime / (1000 * 3600 * 24)), 0);
  }
}
