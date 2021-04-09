import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    private loadingCtrl: LoadingController,
    private navParams: NavParams) { }

  today = Date.now();
  update = false
  pageTitle = ""
  _id=''

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
    if (this.update) {
      this.updateData()
    }
    else{
      this.createData()
    }
  }

  async createData(){
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

  async updateData(){
    this.data.ID = this.ID.toString()
    this.data.Name = this.Name.toString()
    this.data.Age = this.Age.toString()
    this.data.BloodPressure = this.BloodPressure.toString()
    this.data.RespiratoryRate = this.RespiratoryRate.toString()
    this.data.BloodOxygen = this.BloodOxygen.toString()
    this.data.HeartBeat = this.HeartBeat.toString()

    console.log("id for the header is: "+this._id);
    console.log("stringified data: "+JSON.stringify(this.data));
    console.log(
    "\nID: "+this.data.ID+
    "\nName: "+this.data.Name+
    "\nAge: "+this.data.Age+
    "\nBloodPressure: "+this.data.BloodPressure+
    "\nRespiratoryRate: "+this.data.RespiratoryRate+
    "\nBloodOxygen: "+this.data.BloodOxygen+
    "\nHeartBeat: "+this.data.HeartBeat
    )
    let loading = await this.loadingCtrl.create();
    await loading.present();

    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    let options = { headers: headers};

    this.http.put('https://sem1-project-nodejs.herokuapp.com/patients/'+this._id, this.data, options).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((response) => {
      console.log(response);
    });
    this.modalCtrl.dismiss()
  }

  ngOnInit() {
    this.keyboard.hideFormAccessoryBar(false);

    console.table(this.navParams);
    this._id = this.navParams.data._id;
    this.ID = this.navParams.data.ID;
    this.Name = this.navParams.data.Name;
    this.Age = this.navParams.data.Age;
    this.BloodPressure = this.navParams.data.BloodPressure;
    this.RespiratoryRate = this.navParams.data.RespiratoryRate;
    this.BloodOxygen = this.navParams.data.BloodOxygen;
    this.HeartBeat = this.navParams.data.HeartBeat;
    this.update = this.navParams.data.update;
    this.pageTitle = this.navParams.data.pageTitle;

    console.log("passed information is: \n_id: "+this._id+
    "\nID: "+this.ID+
    "\nName: "+this.Name+
    "\nAge: "+this.Age+
    "\nBloodPressure: "+this.BloodPressure+
    "\nRespiratoryRate: "+this.RespiratoryRate+
    "\nupdate: "+this.update+
    "\npageTitle: "+this.pageTitle
    )
  }

}
