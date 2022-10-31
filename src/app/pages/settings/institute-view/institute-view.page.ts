import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, Platform,ModalController, ToastController } from '@ionic/angular';
import { ModalPage } from '../../modal/modal.page';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-institute-view',
  templateUrl: './institute-view.page.html',
  styleUrls: ['./institute-view.page.scss'],
})
export class InstituteViewPage implements OnInit {
  statusChange = true;
  license_isListLoading = false;
  license_listing_url;
  view_url;
  instView;
  parms_action_id;
  addlen;
  skeleton = [
    {},{},{},{},{},{},{},{},{},{},
  ];

  license_deleteApi;
  license_api_parms;
  license_pageNo;
  license_sortColumnName = '';
  license_sortOrderName = '';
  license_tableData;
  license_deleteLoading = false;
  license_tableValueType;
  license_tableHeaderData = [
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
  private license_tableListSubscribe: Subscription;
  private license_deleteDataSubscribe: Subscription;
  // Variables end
  private InstView_get:Subscription;
  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    private plt: Platform,
    private http : HttpClient,
    private commonUtils: CommonUtils, // common functionlity come here
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private modalController : ModalController,
  ){ }

  ngOnInit() {
    this.commonFunction();
  }
  commonFunction(){

    // view data
    this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("parms_action_id", this.parms_action_id); 
    this.view_url = 'institute/view/'+this.parms_action_id;

    this.getInst();

    // license_table list data url name
    this.license_listing_url = 'license/getlist';
    this.license_onRefresh();

    // license_delete api
    this.license_deleteApi = 'emailTemplate/delete/';

    // table list data url name
    this.listing_url = 'package/paginationList';
    this.onRefresh();

    // delete api
    this.deleteApi = 'emailTemplate/delete/';
  }
  // getTemplatefor start
  getInst(){
    console.log("HHH");
    this.InstView_get = this.http.get(this.view_url).subscribe(
        (res:any) => {
          this.instView = res; 
          console.log("All Values",this.instView);
          console.log("All Values",this.instView.instituteAddress.length);
          this.addlen = this.instView.instituteAddress.length;
        },
        errRes => {
           console.log("Get template for  >", errRes);  
        }
      );
    
  }

  /*----------------Table list data start----------------*/
    // Display records start
    license_displayRecord = '10';
    license_displayRecords = [
      { id : '1', displayValue: '10'},
      { id : '2', displayValue: '25'},
      { id : '3', displayValue: '50'},
      { id : '4', displayValue: '100'},
      { id : '5', displayValue: '0'}
    ];
    license_displayRecordChange(_record) {
      console.log('_record', _record);
      
      this.license_displayRecord = _record;
      this.license_pageNo = 0;
      this.license_onListDate(this.license_listing_url, this.license_pageNo, _record, this.license_sortColumnName, this.license_sortOrderName, this.license_tableValueType, this.license_searchTerm);
    }
    // Display records end

    // List data start
    license_onListDate(_listUrl, _pageNo, _displayRecord, _sortColumnName, _sortOrderName, _tableValueType, _searchTerm){
      this.license_isListLoading = true;
      let api = _listUrl+'/'+this.parms_action_id+'/'+_pageNo+'/'+_displayRecord+'/'+_sortColumnName+'/'+_sortOrderName+'/'+_tableValueType;
      this.license_tableListSubscribe = this.http.get(api).subscribe(
        (res:any) => {
          this.license_isListLoading = false;
          console.log('res', res);
          this.license_tableData = res;
        },
        errRes => {
          // this.selectLoadingDepend = false;
          this.license_isListLoading = false;
        }
      );
    }
    // List data end

    // Pagination start
    license_setPage(page: number) {
      console.log('page', page);
      
      this.license_pageNo = page;
      this.license_onListDate(this.license_listing_url, this.license_pageNo, this.license_displayRecord, this.license_sortColumnName, this.license_sortOrderName, this.license_tableValueType, this.license_searchTerm);
      
    }
    // Pagination end

    // Sorting start
    license_isSortTableHeader(_tableHeaderData,  _headerItem ){
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

      this.license_sortColumnName = _headerItem.column_name;
      this.license_sortOrderName = _headerItem.sortingButtonName;

      console.log('this.license_sortColumnName', this.license_sortColumnName);
      console.log('this.license_sortOrderName', this.license_sortOrderName);
      console.log('_tableHeaderData>>', _tableHeaderData);

      this.license_onListDate(this.license_listing_url, this.license_pageNo, this.license_displayRecord, this.license_sortColumnName, this.license_sortOrderName, this.license_tableValueType, this.license_searchTerm);
    }
    // Sorting end

    // Search start
    license_searchTerm:string = '';
    license_searchList(event){
      this.license_searchTerm = event.target.value;

      console.log('this.license_searchTerm', this.license_searchTerm);
      
      this.license_onListDate(this.license_listing_url, this.license_pageNo, this.license_displayRecord, this.license_sortColumnName, this.license_sortOrderName, this.license_tableValueType, this.license_searchTerm);
    }
    // Search end

    // Referesh start
    license_onRefresh(){
      this.license_pageNo = 0;
      this.license_sortColumnName = 'lcId';
      this.license_sortOrderName = 'DESC';
      this.license_searchTerm = '';
      this.license_tableValueType = '0';
      // table data call
      this.license_onListDate(this.license_listing_url, this.license_pageNo, this.license_displayRecord, this.license_sortColumnName, this.license_sortOrderName, this.license_tableValueType, this.license_searchTerm);
    }
    // Referesh end

    // Delete start
    license_deleteData(_id){
      console.log('id>>', _id);
      let sentValues = {'instId': _id};
      this.license_deleteLoading = true;
      this.license_deleteDataSubscribe = this.http.put(this.license_deleteApi, sentValues).subscribe(
        (res:any) => {
          this.license_deleteLoading = false;
          console.log("Edit data  res >", res.return_data);
          if(res.status == 200){
            this.commonUtils.presentToast('success', res.message);
            this.license_onRefresh();
          }else {
            this.commonUtils.presentToast('error', res.message);
          }
        },
        errRes => {
          // this.selectLoadingDepend = false;
          this.license_deleteLoading = false;
        }
      );
    }
    // Delete end

    // Deleted or not start
    license_deletedOrNot(ev: any) {
      console.log('Segment changed', ev);
      this.license_tableValueType = ev.detail.value;
      this.pageNo = 0;
      this.license_onListDate(this.license_listing_url, this.license_pageNo, this.license_displayRecord, this.license_sortColumnName, this.license_sortOrderName, this.license_tableValueType, this.license_searchTerm);
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
        this.license_onRefresh();
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

/*===================================Package start===================================*/
    isListLoading = false;
    listing_url;
    pageNo;
    tableData; 
    sortColumnName;
    deleteApi;
    sortOrderName;
    deleteLoading = false;
    tableValueType;
    tableHeaderData = [
      {
        column_name: "instituteEntity.instName",
        display_name: "Institute",
        sortingButtonName: ""
      },{
        column_name: "pkCdate",
        display_name: "Request Date",
        sortingButtonName: ""
      },{
        column_name: "pkName",
        display_name: "Package",
        sortingButtonName: ""
      },{
        column_name: "pkNusers",
        display_name: "No. of Users",
        sortingButtonName: ""
      },{
        column_name: "pkValidityType",
        display_name: "Request Type",
        sortingButtonName: ""
      },{
        column_name: "pkStatus",
        display_name: "Status",
        sortingButtonName: ""
      }

    ];

    private tableListSubscribe: Subscription;
    private deleteDataSubscribe: Subscription;
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
      let api = _listUrl+'/'+this.parms_action_id+'/'+_pageNo+'/'+_displayRecord+'/'+_sortColumnName+'/'+_sortOrderName+'/'+_tableValueType;

      this.tableListSubscribe = this.http.get(api).subscribe(
        (res:any) => {
          this.isListLoading = false;
          console.log('res', res);
          this.tableData = res;
          console.log('this.tableData', this.tableData.data);
        },
        errRes => {
          // this.selectLoadingDepend = false;
          this.isListLoading = false;
        }
      );
    }
    // List data end

    // Search start
      searchTerm:string = '';
      searchList(event){
        this.searchTerm = event.target.value;

        console.log('this.searchTerm', this.searchTerm);
        
        this.onListDate(this.listing_url, this.pageNo, this.displayRecord, this.sortColumnName, this.sortOrderName, this.tableValueType, this.searchTerm);
      }
    // Search end
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

    // Referesh start
    onRefresh(){
      this.pageNo = 0;
      this.sortColumnName = 'pkId';
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

/*===================================Package end===================================*/
}
