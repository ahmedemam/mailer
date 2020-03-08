import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Email } from '../_models/mail-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient) { }

  sendEmail(email: Email) {
    return this.http.post<Email>(`${environment.MAIL_SERVICE}/`, this.httpOptions);
  }
}
