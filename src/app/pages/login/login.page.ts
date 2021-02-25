import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController
  ) { }

  email: string;
  password: string;
  passwordShown: boolean = false;
  passwordToggleIcon = 'eye';

  ngOnInit() {
  }

  public togglePassword(): void {

    this.passwordShown = !this.passwordShown;

    if (this.passwordToggleIcon == 'eye') {

      this.passwordToggleIcon = 'eye-off';
    } else {

      this.passwordToggleIcon = 'eye';
    }

  }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('/list');
    } catch (error) {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Conexión fallida',
      subHeader: 'No se ha podido acceder a la cuenta.',
      message: 'El correo electrónico y la contraseña proporcionados no son válidos.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }



}
