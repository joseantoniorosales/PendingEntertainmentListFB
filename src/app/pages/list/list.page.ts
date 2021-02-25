import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  items: Observable<Item[]>;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.authService.getCurrentUser().subscribe(
      () => this.items = itemService.getItems()
    );
  }

  ngOnInit() {
  }

  addItem() {
    this.router.navigateByUrl('/create-item');
  }

  goEditItem(id: string) {
    this.router.navigateByUrl('/edit-item/' + id);
  }

  async presentAlertInfo(item: Item) {

    const alert = await this.alertController.create({

      header: `Info about ${item.title}`,
      message: `
              <p>Localized Title: ${item.ogTitle}</p>
              <p>Description: ${item.description}</p>
              <p>Saga: ${item.saga}</p>
              <p>Original Saga: ${item.ogSaga} </p>
              <p>Game Entry: ${item.sagaEntry}</p>
              <p>Genre1: ${item.genre1}</p>
              <p>Genre2: ${item.genre2}</p>
              <p>Duration: ${item.duration}</p>
              <p>Company: ${item.company}</p>
              <p>Platform: ${item.platform} </p>
              <p>State: ${item.state}</p>
              <p>Rating: ${item.rating} </p>
              `
    });

    await alert.present();
  }

}
