import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
declare var M: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo = 'Iniciar Sesión';
  usuario: Usuario;
  constructor(private authservice: AuthService, private router: Router) {
    this.usuario = {};
  }

  ngOnInit() {
    if (this.authservice.isAuthenticated()) {
      M.toast({html: `${this.authservice.usuario.username} ya estás logueado.!`});
      this.router.navigate(['/entidad']);
    }
  }
  login() {
    if (this.usuario.username == null || this.usuario.password == null) {
      this.msjError('Error de Logueo!', 'Usuario o contraseña vacias, verifique.!');
      return;
    }
    this.authservice.login(this.usuario).subscribe(res => {
      this.authservice.guardarUsuario(res.access_token);
      this.authservice.guardarToken(res.access_token);
      M.toast({html: res.welcome});
    }, err => {
      if (err.status === 400) {
        this.msjError('Error de Logueo!', 'Usuario o contraseña incorrectas, verifique.!');
      }
    });
  }
  msjError(titulo: string, msj: string) {
    Swal.fire({
      title: titulo,
      text: msj,
      type: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}
