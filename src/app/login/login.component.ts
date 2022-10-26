import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ILogin } from '../shared/models/login.interface';
import { AutenticadorService } from '../shared/services/autenticador.service';
import { UsuarioService } from '../shared/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private autenticadorService: AutenticadorService
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  private autenticar(login: ILogin): void {
    this.autenticadorService.autenticar(login).subscribe({
      next: (resp) => {
        if (resp.status === HttpStatusCode.Created) {
          const token = resp.headers.get('Authorization');
          if (token) {
            this.usuarioService.token = token;
            this.router.navigate(['dashboard']);
          } else {
            Swal.fire(
              'Erro na autenticação',
              'Ocorreu algum erro na obtenção do token',
              'warning'
              );
          }
        }
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire(
          'Erro na autenticação',
          err.error.mensagem,
          'warning'
          );
      }
    });
  }

  private iniciarFormulario(): void {
    this.formularioLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onEntrar(): void {
    const login = this.formularioLogin.value;
    this.autenticar(login);
  }

}
