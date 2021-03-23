import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-adding',
  templateUrl: './adding.page.html',
  styleUrls: ['./adding.page.scss'],
})
export class AddingPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  ngOnInit() {
  }

}
