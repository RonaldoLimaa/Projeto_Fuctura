import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { ILogin } from '../models/login.interface';
import { DaoService } from './dao.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  constructor(
    private dao: DaoService
  ) { }

  /**
   * Autentica o usuario
   * @param login dados do usuario no login
   * @returns token no header e login no payload
   */
  autenticar(login: ILogin): Observable<HttpResponse<ILogin>> {
    return this.dao.post<ILogin>(AppSettings.API_AUTENTICADOR, login, DaoService.MEDIA_TYPE_APP_JSON);
  }
}
