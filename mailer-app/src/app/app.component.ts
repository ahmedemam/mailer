import { Component } from '@angular/core';
import { Email } from './_models/mail-model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmailService } from './_services/email.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static EMAIL_REGEX_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private email: Email;
  senderEmail = '';
  receiversEmails: string[] = [];
  receiverEmail = '';
  htmlEmailContent: any = '';
  subject = '';
  errorMessage: any = {
    state: true,
    message: ''
  };

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    // uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]

  };

  constructor(private ngxService: NgxUiLoaderService, private emailService: EmailService) { }


  addReceiverEmail() {
    if (this.receiverEmail && AppComponent.EMAIL_REGEX_PATTERN.test(this.receiverEmail) &&
      !this.receiversEmails.includes(this.receiverEmail) && this.senderEmail && AppComponent.EMAIL_REGEX_PATTERN
      && this.receiverEmail !== this.senderEmail) {
      this.receiversEmails = [...this.receiversEmails, this.receiverEmail];
      this.receiverEmail = '';
    }
  }


  validateEmail() {
    if (this.senderEmail && AppComponent.EMAIL_REGEX_PATTERN.test(this.senderEmail)) {
      if (this.receiversEmails.length > 0) {
        if (this.subject.length > 0) {
          if (this.htmlEmailContent !== null || this.htmlEmailContent !== undefined) {
            this.email = {
              from: this.senderEmail,
              to: this.receiversEmails,
              htmlContent: this.htmlEmailContent,
              subject: this.subject
            };
            return {
              state: true,
              message: 'email is valid'
            }
          } else {
            return {
              state: false,
              message: 'Email Body is empty. Must have an email Body.'
            };
          }
        } else {
          return {
            state: false,
            message: 'Email subject is empty. Must have an email subject.'
          };
        }
      } else {
        return {
          state: false,
          message: 'Must have at least one recievers email'
        };
      }
    } else {
      return {
        state: false,
        message: 'Sender Email not valid'
      };
    }
  }

  sendEmail() {
    const validationResult: any = this.validateEmail();
    console.log(validationResult);
    if (validationResult.state === true) {
      console.log(this.email);
      this.ngxService.start();
      this.emailService.sendEmail(this.email).subscribe((response) => {
        this.email = null;
        console.log('response', response);
        this.ngxService.stop();
      }, (error) => {
        console.log('send email: error', error);
        this.ngxService.stop();
      });
    } else {
      this.errorMessage = validationResult;
    }
  }

}
