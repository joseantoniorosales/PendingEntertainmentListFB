import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: string;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  resetPassword() {
    this.authService.resetPassword(this.email)
      .then(
        () => {
          this.alertResetPassword();
          this.router.navigateByUrl('/login');
        }
      ).catch(
        () => this.alertError()
      )
  }

  async alertResetPassword() {
    const alert = await this.alertController.create({
      header: 'Password recovery',
      message: 'An e-mail will be sent to <strong>' + this.email + '</strong> with a link that will allow you to reset your password',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertError() {
    const alert = await this.alertController.create({
      header: 'Password Recovery',
      message: 'An error happened and an e-mail could not be sent to <strong>' + this.email + '</strong> to reset the password',
      buttons: ['OK']
    });

    await alert.present();
  }

}
