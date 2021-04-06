import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { from } from 'rxjs';
import {finalize} from "rxjs/operators";
import { ModalController } from '@ionic/angular';
import { AddingPage } from '../adding/adding.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.page.html',
  styleUrls: ['./mainscreen.page.scss'],
})
export class MainscreenPage implements OnInit {
  constructor(
    private http: HttpClient,
     private nativeHttp: HTTP,
      private plt: Platform,
       private loadingCtrl: LoadingController,
       private modalCtrl:ModalController,
       private alertCtrl: AlertController) {

  }


  filterTerm: string;
  data = [];

  selectedPatient = {
    _id:'',
    ID: '',
    DateTime: '',
    Name: '',
    Age: '',
    BloodPressure: '',
    RespiratoryRate: '',
    BloodOxygen: '',
    HeartBeat: ''
  };


  selectPatient(patient){
    this.selectedPatient = patient;
    console.log("YASTA EL MAHALABEYA AHEH: ",this.selectedPatient)

    var matchedPatient = this.data.filter(v => {
      if(v._id.toLowerCase() == this.selectedPatient._id) {
        return true;
      }
      return false;
    })
    console.log("Wel 7etta el gamda aheh: ", matchedPatient)

  }

  deleteData(){
    if (this.selectedPatient.ID == ''){
      console.log('balash 5edaa3 asa7by')
    }
    else{
      console.log('nemsa7 el wad dah '+this.selectedPatient.ID)
      let nativeCall = this.nativeHttp.delete('https://sem1-project-nodejs.herokuapp.com/patients/'+this.selectedPatient.ID,{},{
      "content-type": "application/json"
    });
    this.confirmDeletion(this.selectedPatient.Name)
    }
  }

  async confirmDeletion(name) {
    console.log("confirm deletion is working")
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: '',
      message: 'User '+name+' has been successfully deleted',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.getData();
        }
      }]
    });
    await alert.present();
  }

  async showModal(){
    const modal = await this.modalCtrl.create({
      component: AddingPage,
      cssClass: 'form-content',
      showBackdrop: false,
      swipeToClose: true
    }).then(modalres =>{modalres.present();})
  }

  async getAllData(){
    let loading = await this.loadingCtrl.create();
    await loading.present();

    this.http.get('https://sem1-project-nodejs.herokuapp.com/patients').pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
      this.data = data['results'];
    },err => {console.log('error during js call: ',err);});
  }


  async getDataNative(){
    let loading = await this.loadingCtrl.create();
    await loading.present();

    let nativeCall = this.nativeHttp.get('https://sem1-project-nodejs.herokuapp.com/patients',{},{
      'Content-Type':'application/json'
    });
    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
      console.log("NAtive data: ",data);
      let parsed = JSON.parse(data.data);
      console.log(" my parsed data: ", parsed);
      this.data = parsed;
      console.log(" my final data: ", this.data);
    },err => {console.log('error during js call: ',err);});
  }

  ngOnInit() {
    this.getData()
    }

  getData(){
    if (this.plt.is('cordova')){
      this.getDataNative();
    } else {
      this.getAllData();
    }
  }

    addData(){
      this.showModal()
    }

}
