import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-hsn',
  templateUrl: './add-hsn.page.html',
  styleUrls: ['./add-hsn.page.scss'],
})
export class AddHsnPage implements OnInit {

  model: any = {};
  cities = [
    {
        id: 1,
        name: 'Vilnius',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: 'Kaunas', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'Pavilnys',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: 'Siauliai',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
  ];
  serviceType = [
    // {value: 'Select Service Type', viewValue: 'Select Service Type'},
    {value: 'Package', viewValue: 'Package'},
    {value: 'Licence', viewValue: 'Licence'},
  ];
  setDefault = [
    {value: 'Not Default', viewValue: 'Not Default'},
    {value: 'Default', viewValue: 'Default'},
  ];
  // selectedserviceType = this.serviceType[0].value;
  constructor(
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your data have been saved.',
      duration: 2000,
      cssClass:"my-tost-custom-classsuccess",
    });
    toast.present();
  }

}
