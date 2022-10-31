import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { ModalPage } from 'src/app/pages/modal/modal.page';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {

  showSearch: boolean = false;
  storeDate;
  constructor(
    private navCtrl : NavController,
    public menuCtrl: MenuController,
    private authService: AuthService,
    private modalController : ModalController,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.commonFunction();
  }

  commonFunction(){
    
    // User detailsls get
    this.authService.globalparamsData.subscribe(res => {
      if(res != null || res != undefined){
        this.storeDate = res;
        console.log('User store data >>>>>>>>>>', this.storeDate);
      }
    });
    
    
  }
  
  //======================= logout functionlity start ==============
  logout() {
    this.storage.clear().then(() => {
      console.log('all stroage data cleared');
      
       window.location.reload(); //working

    });
    // this._globalparamsData = null;
  }
  // logout functionlity end


  // ..... Restore licence modal start ......
  async changePassword(_identifier, _item, _items) {
    // console.log('_identifier >>', _identifier);
    let changePassword_modal;
    changePassword_modal = await this.modalController.create({
    component: ModalPage,
    cssClass: 'mymodalClass small',
    componentProps: { 
      identifier: _identifier,
      modalForm_item: _item,
      modalForm_array: _items
    }
    });
    
    // modal data back to Component
    changePassword_modal.onDidDismiss()
    .then((getdata) => {
    console.log('getdata >>>>>>>>>>>', getdata);
    if(getdata.data == 'submitClose'){
      /* this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);  */
    }
    
    });
    
    return await changePassword_modal.present();
  }
  // Restore licence modal end 

  showSearchBox(_item) {
    console.log('showSearch>>', this.showSearch);
    if(this.showSearch == false) {
      this.showSearch = true;
    }else{
      this.showSearch = false;
    }
  }

  // Goto page start
  goToPage(_url, _item){
    console.log('goToPage _url >', _url);
    console.log('goToPage _item >', _item);
    // this.router.navigateByUrl(_url);

    this.navCtrl.navigateRoot(_url);
  }

}
