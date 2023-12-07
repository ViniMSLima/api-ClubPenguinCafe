import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ClientServiceService } from '../services/client-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSlideToggleModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    public dialog: MatDialog,
    private client: ClientServiceService,
    private http: HttpClient,
    private router: Router
  ) {}

  username: string = '';
  password: string = '';

  logar() {
    this.client.login(
      {
        login: this.username,
        password: this.password,
        isAdm: false,
      },
      (result: any) => {
        if (result == null) {
          alert('Senha ou usuário incorreto!');
        } else {
          sessionStorage.setItem('jwt', JSON.stringify(result));

          console.log(':result: ', result);

          if (result.isAdm == false) this.router.navigate(['telacliente']);
          else this.router.navigate(['telaadm']);
        }
      }
    );
  }

  registrar() {
    this.dialog.open(NewUserDialog);
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    var jwt = sessionStorage.getItem('jwt');
    if (jwt == null) return;
    formData.append('jwt', jwt);

    this.http
      .put('https://localhost:7122/user/image', formData)
      .subscribe((result) => console.log('ok!'));
  };
}

@Component({
  selector: 'app-new-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './new-user-dialog.component.html',
  styleUrl: './login.component.css',
})
export class NewUserDialog {
  username: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(
    public dialogRef: MatDialogRef<NewUserDialog>,
    private client: ClientServiceService
  ) {}

  create() {
    if (this.password == this.repeatPassword) {
      this.client.register({
        login: this.username,
        password: this.password,
        isAdm: false,
      });

      this.dialogRef.close();
    } else alert('Password and repeatPassword are different!!!');
  }
}

@Component({
  selector: 'app-new-adm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './new-adm-dialog.component.html',
  styleUrl: './login.component.css',
})
export class NewAdmDialog {
  username: string = '';
  password: string = '';
  repeatPassword: string = '';
  isChecked: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewUserDialog>,
    private client: ClientServiceService
  ) {}

  create() {
    if (this.password == this.repeatPassword) {
      this.client.register({
        login: this.username,
        password: this.password,
        isAdm: this.isChecked,
      });

      this.dialogRef.close();
    } else alert('Password and repeatPassword are different!!!');
  }
}
