import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-adding',
  templateUrl: './adding.page.html',
  styleUrls: ['./adding.page.scss'],
})
export class AddingPage implements OnInit {

  constructor(private modalCtrl:ModalController,
    public navCtrl: NavController,
    public keyboard:Keyboard,
    private http: HttpClient,
    private loadingCtrl: LoadingController) { }

  today = Date.now();

  ID= ''
  Name= ''
  Age= ''
  BloodPressure= ''
  RespiratoryRate= ''
  BloodOxygen= ''
  HeartBeat= ''


  data = {
    ID: '',
    Name: '',
    Age: '',
    BloodPressure: '',
    RespiratoryRate: '',
    BloodOxygen: '',
    HeartBeat: ''
  }

  setFocus(nextElement) {
     nextElement.setFocus(); //For Ionic 4
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  async postData(){
    this.data.ID = this.ID.toString()
    this.data.Name = this.Name.toString()
    this.data.Age = this.Age.toString()
    this.data.BloodPressure = this.BloodPressure.toString()
    this.data.RespiratoryRate = this.RespiratoryRate.toString()
    this.data.BloodOxygen = this.BloodOxygen.toString()
    this.data.HeartBeat = this.HeartBeat.toString()

    let loading = await this.loadingCtrl.create();
    await loading.present();

    this.http.post('https://sem1-project-nodejs.herokuapp.com/patients', this.data).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((response) => {
    console.log(response);
  });
  this.modalCtrl.dismiss()
  }

  ngOnInit() {
    this.keyboard.hideFormAccessoryBar(false);
  }

}
