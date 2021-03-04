import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private storage: Storage) { }

  rateInput: number;
  data: string = "";
  message: string = "";

  ngOnInit() {
  }

  saveRate() {

    this.storage.set(this.data, this.rateInput);

    

  }

  loadRate() {

    this.storage.get(this.data).then((data) => {

      this.data = data;

      console.log("Your rating of the app is: " + data);

      
      if (data > 70) {

        console.log("Thanks for the positive rate! hope you enjoy using our app");

        this.message = "Thanks for the positive rate! hope you enjoy using our app"
      
      } else if (data >= 50 && data <= 70) {

        console.log("Thanks for your rate, we will try to satisfy your necesities even more in further updates!");

        this.message = "Thanks for your rate, we will try to satisfy your necesities even more in further updates!"
      
      } else {

        console.log("We are sorry you didn't enjoyed our app, we will try to make It better")

        this.message = "We are sorry you didn't enjoyed our app, we will try to make It better"
      }
    })
  }


  deleteRate() {

    this.storage.clear();
  }

}
