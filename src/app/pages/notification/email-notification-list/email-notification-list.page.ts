import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-email-notification-list',
  templateUrl: './email-notification-list.page.html',
  styleUrls: ['./email-notification-list.page.scss'],
})
export class EmailNotificationListPage implements OnInit {
  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    private plt: Platform,
    private http : HttpClient,
    private commonUtils: CommonUtils // common functionlity come here
  ) { }

  // Variables start
  statusChange = true;
  isListLoading = false;
  skeleton = [
    {},{},{},{},{},{},{},{},{},{},
  ]
  listing_url;
  api_parms;
  pageNo;
  sortColumnName = '';
  sortOrderName = '';
  tableData;
  tableListData = [];
  deleteApi;
  deleteLoading = false;
  tableValueType;
  restoreApi;
  restoreLoading = false;
  tableHeaderData = [
    {
      column_name: "etAction",
      display_name: "Template For",
      sortingButtonName: ""
    },{
      column_name: "etName",
      display_name: "Template Name",
      sortingButtonName: ""
    },{
      column_name: "etType",
      display_name: "Status",
      sortingButtonName: ""
    }
  ];

  // ......check uncheck start....
  itemcheckClick = false;
  checkedList = [];
  allselectModel;
  // check uncheck end

  private tableListSubscribe: Subscription;
  private deleteDataSubscribe: Subscription;
  private restoreDataSubscribe: Subscription;
  private primaryDataSubscribe: Subscription;
  // Variables end

  ngOnInit() {
    this.commonFunction();
  }

  ionViewWillEnter() {
    this.commonFunction();
  }
  
  commonFunction(){

    // table list data url name
    this.listing_url = 'emailTemplate/getAll/template';
    this.onRefresh();

    // delete api
    this.deleteApi = 'emailTemplate/delete';
    // restore api
    this.restoreApi = 'emailTemplate/restore'
  }

  async presentToast(_msg, _type) {
    const toast = await this.toastController.create({
      message: _msg,
      duration: 2000,
      cssClass:"my-tost-custom-class" +_type,
    });
    toast.present();
  }

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
    }
    this.isListLoading = false;
  }

  // Aleart start
  async presentAlert(_identifier, _id) {
    console.log('_identifier', _identifier);
    console.log('_id', _id);
    let messages,headers;

    if(_identifier == 'delete')
    {
      headers = "Delete"
      messages = "Are you sure want to delete this template?";
    }else if(_identifier == 'restore'){
      headers = "Restore"
      messages = "Are you sure want to restore this template?";
    }else if(_identifier == 'primarySet'){
      headers = "Primary"
      if(_id.isPrimary == 0){
        messages = "Are you sure want change this to set primary?";
      }else {
        messages = "Are you sure want change this to set non-primary?";
      }
      
    }
    const alert = await this.alertController.create({
      cssClass: 'aleart-popupBox',
      header: headers,
      message: messages,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'popup-cancel-btn',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          cssClass: 'popup-ok-btn',
          handler: () => {
            console.log('Confirm Okay');
            if(_identifier == 'delete'){
              this.deleteData(_id);
            }else if(_identifier == 'restore'){
              this.restoreDeleteData(_id);
            }else if(_identifier == 'primarySet'){
              this.primarySetData(_id.etId);
            }
          }
        }
      ]
    });

    await alert.present();
  }
  // Aleart end



  /*----------------Table list data start----------------*/
    // Set primary start
    primarySetData(_id){
      console.log('id>>', _id);
      let sentValues = {'etId': _id};
      this.primaryDataSubscribe = this.http.put('emailTemplate/setPrimaryAndNonPrimary', sentValues).subscribe(
        (res:any) => {
          console.log("Edit data  res >", res.return_data);
          if(res.status == 200){
            this.commonUtils.presentToast('success', res.message);
            this.onRefresh();
          }else {
            this.commonUtils.presentToast('error', res.message);
          }
        },
        errRes => {

        }
      );
    }
    // Set primary end

    // select all check box start
    allSelectItem(event) {
      if (event.target.checked) {
        this.itemcheckClick = false;
        // console.log('check item selkectedddddddddddddd');
        for (let i = 0 ; i < this.tableListData.length; i++) {
          // if(this.checkedList.includes(this.items[i].id) === false)
          if (this.checkedList.indexOf(this.tableListData[i]) === -1 && this.tableListData[i] !== null) {
            this.checkedList.push(this.tableListData[i]);
            this.tableListData[i].isSelected = true;

          }
        }
      } else if (this.itemcheckClick == false) {
        // console.log('not check item selectionnnnnnnnnnn')
        this.checkedList = [];
        for (let i = 0 ; i < this.tableListData.length; i++) {
          if (this.checkedList.indexOf(this.tableListData[i]) === -1)
          {
            this.tableListData[i].isSelected = false;

          }
        }
      }

      console.log('checked item all @@ >>', this.checkedList);
      console.log('tableListData item all @@ >>', this.tableListData);
    }
    // Select all checkbox end

    // Select single checkbox start
    onCheckboxSelect(option, event) {
      if (event.target.checked) {
        if (this.checkedList.indexOf(option) === -1) {
          this.checkedList.push(option);
        }
      } else {
          for (let i = 0 ; i < this.tableListData.length; i++) {
            if (this.checkedList[i] == option) {
              this.checkedList.splice(i, 1);
          }
        }
      }

      if (this.tableListData.length <= this.checkedList.length) {
      this.allselectModel = true;
      console.log('length 4');
      } else {
        console.log('length 0');
        this.allselectModel = false;
        this.itemcheckClick = true;

      }

      console.log('checked item single >>', this.checkedList);
    }
    // Select single checkbox end


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
          this.tableListData = res.data;

          //---------  check item show start ----------
          if(this.tableListData && this.checkedList){
            for (let i = 0 ; i < this.tableListData.length; i++) {
              for (let j = 0 ; j < this.checkedList.length; j++) {
                if(this.checkedList[j].etId ==  this.tableListData[i].etId){
                  this.tableListData[i].isSelected = true;
                }
              }
            }
          }
          // check item show end
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
      this.sortColumnName = 'etId';
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
      let sentValues = {'etId': _id};
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

    // Restore delete data start
    restoreDeleteData(_id){
      console.log('id>>', _id);
      let sentValues = {'etId': _id};
      this.restoreLoading = true;
      this.restoreDataSubscribe = this.http.put(this.restoreApi, sentValues).subscribe(
        (res:any) => {
          this.restoreLoading = false;
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
          this.restoreLoading = false;
        }
      );
    }
    // Restore delete data end

    // Deleted or not start
    deletedOrNot(ev: any) {
      console.log('Segment changed', ev);
      this.tableValueType = ev.detail.value;
      this.pageNo = 0;
      this.onListDate(this.listing_url, this.pageNo, this.displayRecord, this.sortColumnName, this.sortOrderName, this.tableValueType, this.searchTerm);
    }
    // Deleted or not end

    // ---------------- Click Delete Item start ---------------------
    deleteLodershow = false; 
    alldeleteLoaderShow = false;
    async onClickDeleteItem(_identifire, _item, _items, _index){
      const alert = await this.alertController.create({
        cssClass: 'aleart-popupBox',
        header: 'Delete',
        message: 'Do you really want to delete selected template?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'popup-cancel-btn',
            handler: (blah) => {
              // console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Ok',
            cssClass: 'popup-ok-btn',
            handler: () => {

              // ------------ single item delete start ------------
              if(_identifire == 'single'){
                console.log('_item', _item);
                
                let sentValues = {'etId': _item.etId};
                _item.deleteLodershow = true;
                this.deleteDataSubscribe = this.http.put("emailTemplate/delete", sentValues).subscribe(
                  (res:any) => {
                    _item.deleteLodershow = false;
                    console.log("Edit data  res >", res.return_data);
                    if(res.status == 200){
                      _items.splice( _index, 1 );
                      this.commonUtils.presentToast('success', res.return_message);
                      if(_items.length == 0){
                        this.allselectModel = false;
                      }
                      this.commonUtils.presentToast('success', res.message);
                      this.onRefresh();
                    }else {
                      this.commonUtils.presentToast('error', res.message);
                    }
                  },
                  errRes => {
                    // this.selectLoadingDepend = false;
                    _item.deleteLodershow = false;
                  }
                );
              // ------------ single item delete end ------------
              }else{
                let checkItemIdArray = [];
                if(this.checkedList){
                  this.checkedList.forEach(element => {
                    checkItemIdArray.push(element.etId);
                  });
                }
                if(_items){
                  _items.forEach(element => {
                    this.checkedList.forEach(element1 => {
                      if(element.etId == element1.etId){
                        element.deleteLodershow = true; //loader show
                        this.alldeleteLoaderShow = true;
                      }
                    });
                  });
                }
                
                this.deleteDataSubscribe = this.http.put(this.listing_url+'_actonall?action=delete&'+this.listing_url+'_id=', checkItemIdArray).subscribe(
                (res:any) => {
                  if(res.status == 200){
                    if(_items){
                      for (let i = 0 ; i < _items.length; i++) {
                        for (let j = 0 ; j < this.checkedList.length; j++) {
                          if ( _items[i].id == this.checkedList[j].id ) {
                            // _items.splice(i, i);
                            
                            this.checkedList = [];
                            // _items.splice(_items.indexOf(_items[i]), 1);
                            this.deleteLodershow = false; //loader hide
                            this.alldeleteLoaderShow = false;
                            // console.log('delete items >>', _items);
                            // console.log('delete this.checkedList >>', this.checkedList);
                            
                            this.allselectModel = false; 
                          }
                        }
                      };
                      if(_items.length == 0){
                        this.allselectModel = false;
                        this.checkedList = [];
                        checkItemIdArray = [];
                      }
                    }
                    this.commonUtils.presentToast('success', res.message);
                    this.onRefresh();
                  }else {
                    this.commonUtils.presentToast('error', res.message);
                  }
                },errRes => {
                  this.deleteLodershow = false; //loader hide
                  this.alldeleteLoaderShow = false;
                  _items.forEach(element => {
                    this.checkedList.forEach(element1 => {
                      if(element.etId == element1.etId){
                        element.deleteLodershow = false;
                        this.alldeleteLoaderShow = false;
                      }
                    });
                  });
                }); 
              }
              
  
            }
          }
        ]
      });
  
      await alert.present();

    }
    // Click Delete Item end

  /*----------------Table list data end----------------*/

  

  // ----------- destroy unsubscription start ---------
  ngOnDestroy() {
    if(this.tableListSubscribe !== undefined){
      this.tableListSubscribe.unsubscribe();
    }
    if(this.deleteDataSubscribe !== undefined){
      this.deleteDataSubscribe.unsubscribe();
    }
    if(this.restoreDataSubscribe !== undefined){
      this.restoreDataSubscribe.unsubscribe();
    }
    if(this.primaryDataSubscribe !== undefined){
      this.primaryDataSubscribe.unsubscribe();
    }
  }
  // ----------- destroy unsubscription end ---------

}
