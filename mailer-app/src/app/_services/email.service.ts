import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../_models/mail-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient) { }

  public sendEmail(email: Email) {
    return this.http.post<Email>(`${environment.MAIL_SERVICE}`, this.httpOptions);
  }
}
