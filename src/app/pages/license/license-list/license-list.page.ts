import { ModalController} from '@ionic/angular';
import { ModalPage } from '../../modal/modal.page';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.page.html',
  styleUrls: ['./license-list.page.scss'],
})
export class LicenseListPage implements OnInit {
  constructor(
    public toastController: ToastController,
    private modalController : ModalController,
    public alertController: AlertController,
    private plt: Platform,
    private http : HttpClient,
    private commonUtils: CommonUtils // common functionlity come here
  ) { }

  // Variables start
  statusChange = true;
  isListLoading = false;
  listing_url;
  deleteApi;
  api_parms;
  pageNo;
  sortColumnName = '';
  sortOrderName = '';
  tableData;
  deleteLoading = false;
  tableValueType;
  tableHeaderData = [
    {
      column_name: "lcName",
      display_name: "License Name",
      sortingButtonName: ""
    },{
      column_name: "lcCreatDate",
      display_name: "Creation Date",
      sortingButtonName: ""
    },{
      column_name: "lcValidityNum",
      display_name: "Validity Number",
      sortingButtonName: ""
    },{
      column_name: "lcValidityType",
      display_name: "Validity   Type",
      sortingButtonName: ""
    },{
      column_name: "instituteEntity.instName",
      display_name: "Institute",
      sortingButtonName: ""
    },{
      column_name: "lcEndDate",
      display_name: "Expiry Date",
      sortingButtonName: ""
    },{
      column_name: "lcStype",
      display_name: "Server Type",
      sortingButtonName: ""
    },{
      column_name: "lcStatus",
      display_name: "Status",
      sortingButtonName: ""
    }
  ];
  private tableListSubscribe: Subscription;
  private deleteDataSubscribe: Subscription;
  // Variables end

  ngOnInit() {
    this.commonFunction();
  }

  ionViewWillEnter() {
    this.commonFunction();
  }
  commonFunction(){

    // table list data url name
    this.listing_url = 'license/list';
    this.onRefresh();

    // delete api
    this.deleteApi = 'emailTemplate/delete/';
  }
  /*----------------Table list data start----------------*/
    // Display records start
    displayRecord = '10';
    displayRecords = [
      { id : '1', displayValue: '10'},
      { id : '2', displayValue: '25'},
      { id : '3', displayValue: '50'},
      { id : '4', displayValue: '100'},
      { id : '5', displayValue: '0'}
    ];
    displayRecordChange(_record) {
      console.log('_record', _record);
      
      this.displayRecord = _record;
      this.pageNo = 0;
      this.onListDate(this.listing_url, this.pageNo, _record, this.sortColumnName, this.sortOrderName, this.tableValueType, this.searchTerm);
    }
    // Display records end

    // List data start
    onListDate(_listUrl, _pageNo, _displayRecord, _sortColumnName, _sortOrderName, _tableValueType, _searchTerm){
      this.isListLoading = true;
      let api = _listUrl+'/'+_pageNo+'/'+_displayRecord+'/'+_sortColumnName+'/'+_sortOrderName+'/'+_tableValueType+'?keyword='+ _searchTerm;
      this.tableListSubscribe = this.http.get(api).subscribe(
        (res:any) => {
          this.isListLoading = false;
          console.log('res', res);
          this.tableData = res;
        },
        errRes => {
          // this.selectLoadingDepend = false;
          this.isListLoading = false;
        }
      );
    }
    // List data end

    // Pagination start
    setPage(page: number) {
      console.log('page', page);
      
      this.pageNo = page;
      this.onListDate(this.listing_url, this.pageNo, this.displayRecord, this.sortColumnName, this.sortOrderName, this.tableValueType, this.searchTerm);
      
    }
    // Pagination end

    // Sorting start
    isSortTableHeader(_tableHeaderData,  _headerItem ){
      console.log('_tableHeaderData', _tableHeaderData);
      console.log('_headerItem', _headerItem);

      // all field reset first
      _tableHeaderData.forEach((val) => {
        val.sortingButtonName = ''
      })

      _headerItem.orederShow = !_headerItem.orederShow;
      if(_headerItem.orederShow) {
        _headerItem.sortingButtonName = "ASC";
      }else
      {
        _headerItem.sortingButtonName = "DESC";
      }

      this.sortColumnName = _headerItem.column_name;
      this.sortOrderName = _headerItem.sortingButtonName;

      console.log('this.sortColumnName', this.sortColumnName);
      console.log('this.sortOrderName', this.sortOrderName);
      console.log('_tableHeaderData>>', _tableHeaderData);

      this.onListDate(this.listing_url, this.pageNo, this.displayRecord, this.sortColumnName, this.sortOrderName, this.tableValueType, this.searchTerm);
    }
    // Sorting end

    // Search start
    searchTerm:string = '';
    searchList(event){
      this.searchTerm = event.target.value;

      console.log('this.searchTerm', this.searchTerm);
      
      this.onListDate(this.listing_url, this.pageNo, this.displayRecord, this.sortColumnName, this.sortOrderName, this.tableValueType, this.searchTerm);
    }
    // Search end

    // Referesh start
    onRefresh(){
      this.pageNo = 0;
      this.sortColumnName = 'lcId';
      this.sortOrderName = 'DESC';
      this.searchTerm = '';
      this.tableValueType = '0';
      // table data call
      this.onListDate(this.listing_url, this.pageNo, this.displayRecord, this.sortColumnName, this.sortOrderName, this.tableValueType, this.searchTerm);
    }
    // Referesh end

    // Delete start
    deleteData(_id){
      console.log('id>>', _id);
      let sentValues = {'instId': _id};
      this.deleteLoading = true;
      this.deleteDataSubscribe = this.http.put(this.deleteApi, sentValues).subscribe(
        (res:any) => {
          this.deleteLoading = false;
          console.log("Edit data  res >", res.return_data);
          if(res.status == 200){
            this.commonUtils.presentToast('success', res.message);
            this.onRefresh();
          }else {
            this.commonUtils.presentToast('error', res.message);
          }
        },
        errRes => {
          // this.selectLoadingDepend = false;
          this.deleteLoading = false;
        }
      );
    }
    // Delete end

    // Deleted or not start
    deletedOrNot(ev: any) {
      console.log('Segment changed', ev);
      this.tableValueType = ev.detail.value;
      this.pageNo = 0;
      this.onListDate(this.listing_url, this.pageNo, this.displayRecord, this.sortColumnName, this.sortOrderName, this.tableValueType, this.searchTerm);
    }
    // Deleted or not end

  /*----------------Table list data end----------------*/

  async presentToast(_msg, _type) {
    const toast = await this.toastController.create({
    message: _msg,
    duration: 2000,
    cssClass:"my-tost-custom-class" +_type,
    });
    toast.present();
  }
// ..... Restore licence modal start ......
async RestoreLicenceOpenModal(_identifier, _item, _items) {
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
this.presentToast('License Restored', 'success');
if(getdata.data == 'submitClose'){
  /* this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);  */
}

});

return await changePassword_modal.present();
}
// Restore licence modal end 
// ..... EndLicence modal start ......
async EndLicenceOpenModal(_identifier, _item, _items) {
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
  this.presentToast('License Ended', 'success');
  if(getdata.data == 'submitClose'){
    /* this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);  */
  }

  });

  return await changePassword_modal.present();
}
// EndLicence modal end 
// .....  Renew licence modal start ......
async RenewLicenceOpenModal(_identifier, _item, _items) {
  // console.log('_identifier >>', _identifier);
let RenewLicence_Modal;
RenewLicence_Modal = await this.modalController.create({
  component: ModalPage,
  cssClass: 'mymodalClass small',
  componentProps: { 
    identifier: _identifier,
    modalForm_item: _item,
    modalForm_array: _items
  }
});
  
// modal data back to Component
RenewLicence_Modal.onDidDismiss()
.then((getdata) => {
  console.log('getdata >>>>>>>>>>>', getdata);
  this.presentToast('License Renewed', 'success');
  if(getdata.data == 'submitClose'){
    /* this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);  */
  }

  });

  return await RenewLicence_Modal.present();
}
//  Renew licence modal end 
// ..... SuspendLicence modal start ......
async SuspendLicenceOpenModal(_identifier, _item, _items) {
  // console.log('_identifier >>', _identifier);
  let RenewLicence_Modal;
  RenewLicence_Modal = await this.modalController.create({
  component: ModalPage,
  cssClass: 'mymodalClass small',
  componentProps: { 
    identifier: _identifier,
    modalForm_item: _item,
    modalForm_array: _items
  }
});
  
// modal data back to Component
RenewLicence_Modal.onDidDismiss()
.then((getdata) => {
  console.log('getdata >>>>>>>>>>>', getdata);
  
  if(getdata.data == 'submitClose' && getdata.role == '200'){
    this.onRefresh();
  }

  });

  return await RenewLicence_Modal.present();
}
// SuspendLicence modal end    
// ..... extandLicence modal start ......
async ExtendLicenceOpenModal(_identifier, _item, _items) {
  // console.log('_identifier >>', _identifier);
let RenewLicence_Modal;
RenewLicence_Modal = await this.modalController.create({
  component: ModalPage,
  cssClass: 'mymodalClass small',
  componentProps: { 
    identifier: _identifier,
    modalForm_item: _item,
    modalForm_array: _items
  }
});
  
// modal data back to Component
RenewLicence_Modal.onDidDismiss()
.then((getdata) => {
  console.log('getdata >>>>>>>>>>>', getdata);
  this.presentToast('License Extended', 'success');
  if(getdata.data == 'submitClose'){
    /* this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);  */
  }

  });

  return await RenewLicence_Modal.present();
}
// extandLicence modal end     
  clickActionBtn(_value, _identifier) {
    let status;
    let type;
    this.isListLoading = true;
    if(_identifier == 'status') {
      
      if(_value == true) {
        this.statusChange = false;
        status = 'Your status is disable';
        type = 'info'
      }else {
        this.statusChange = true;
        status = 'Your status is enable';
        type = 'success'
      }

      console.log('statusChange', this.statusChange);
      this.presentToast(status, type);
    }else if(_identifier == 'delete') {
      status = 'Deleted successfully';
      type = 'success'
      this.presentToast(status, type);
    }else if(_identifier == 'edit') {
      status = 'Your data is editable';
      type = 'success'
      this.presentToast(status, type);
    }else if(_identifier == 'sendMail') {
      status = 'Email sending.....';
      type = 'success'
      this.presentToast(status, type);
    }else if(_identifier == 'pdf') {
      status = 'Downloading PDF file';
      type = 'success'
      this.presentToast(status, type);
    }else if(_identifier == 'excel') {
      status = 'Downloading Excel file';
      type = 'success'
      this.presentToast(status, type);
    }else if(_identifier == 'refresh') {
      status = 'Data refreshing...';
      type = 'success'
      this.presentToast(status, type);
    }else if(_identifier == 'generate') {
      status = 'License generated';
      type = 'success'
      this.presentToast(status, type);
    }
    this.isListLoading = false;
  }

}
