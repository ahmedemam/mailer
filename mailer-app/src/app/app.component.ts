import { Component } from '@angular/core';
import { Email } from './_models/mail-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private email: Email;
  fromEmail: string;
  toEmails: string [];
  toEmail: string;
  htmlContent: any;

  constructor(){}

}
