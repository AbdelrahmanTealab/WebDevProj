import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { from } from 'rxjs';
import {finalize} from "rxjs/operators";
@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.page.html',
  styleUrls: ['./mainscreen.page.scss'],
})
export class MainscreenPage implements OnInit {
  constructor(private http: HttpClient, private nativeHttp: HTTP, private plt: Platform, private loadingCtrl: LoadingController) {

  }

  data = [];

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


  getData(){
    if (this.plt.is('cordova')){
      this.getDataNative();
    } else {
      this.getAllData();
    }
  }

  ngOnInit() {

    }

}
