import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  itemList: Item = {
    id: '', title: '', ogTitle: '', shortName: '', saga: '', ogSaga: '', sagaEntry: '', company: '', genre1: '', genre2: '', description: '', platform: '', duration: 0, state: '', rating: 0, fav: false, url: '',

    type: '', 
    
    animationCompany: '', chapters: 0, audio: '', 
    
    author: '', numPages: 0, 
    
    composer: ''
  };

  pageTitle: string = "New Item";
  id: string;
  action: string = "create";

  constructor(
    private itemListService: ItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id != null) {

      this.pageTitle = "Edit item";
      this.action = "edit";
      this.itemListService.getItemById(this.id)
        .subscribe(
          data => this.itemList = data
        );
    }
  }

  additem() {

    if (this.action === 'create') {

      this.itemListService.addItem(this.itemList);

    } else {

      this.itemListService.updateItemById(this.id, this.itemList);
    }

    this.router.navigateByUrl('/list');
  }
}
