import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-add-subscription-package',
  templateUrl: './add-subscription-package.page.html',
  styleUrls: ['./add-subscription-package.page.scss'],
})
export class AddSubscriptionPackagePage implements OnInit {
  // Variables start
  model: any = {};
  validity = [
    {
        id: 1,
        name: 'Years',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: 'Months', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'Days',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
  ];

  parms_action_name;
  parms_action_id;
  form_api;
  actionHeaderText;
  editLoading = false;
  allEditData;
  editApi;
  editForm_api;
  institutes;
  instEdit = false;
  hideInstitute = false;
  getInstituteList_api;
  private formSubmitSubscribe: Subscription;
  private editDataSubscribe: Subscription;
  private getInstitutes:Subscription;
  // Variables end

  constructor(
    public toastController: ToastController,
    public menuCtrl: MenuController,
    private http : HttpClient,
    private commonUtils: CommonUtils, // common functionlity come here
    private router: Router,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.commonFunction();
  }

  ionViewWillEnter() {
    this.commonFunction();
  }

  commonFunction(){
    // get active url name
    this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);
    this.parms_action_name = this.activatedRoute.snapshot.paramMap.get('action');
    this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getInstituteList_api ="institute/getlicenselist";
    this.getInstituteList();
    console.log('parms_action_name', this.parms_action_name);
    console.log('parms_action_id', this.parms_action_id);
    
    
    // edit api
    if(this.parms_action_name == 'edit'){
      this.editApi = 'package/view/'+this.parms_action_id;

      // init call
      this.init();

      this.editForm_api = 'package/update/'+this.parms_action_id;
    }else if(this.parms_action_name == 'add'){
      
      if(this.parms_action_id !== 'id'){
        this.model = {
          instId : parseInt(this.parms_action_id),
        }
        this.hideInstitute = true;
      }
    }

    // form_api Api
    this.form_api = 'package/add';
  }
   getInstituteList()
  {
    console.log("HHH");
    this.getInstitutes = this.http.get(this.getInstituteList_api).subscribe(
        (res:any) => {
          console.log("Get template for  >", res[0].etAction); 
          console.log("Get template for length",res.length);
          this.institutes = res; 
          console.log("Get template for length",this.institutes);

        },
        errRes => {
           console.log("Get template for  >", errRes);  
        }
      );
  }
  ngsel(value)
  {
     console.log("select", value);  
  }
  // ---------- init start ----------
  init(){
    if( this.parms_action_name == 'edit'){
      this.instEdit=true;
      this.actionHeaderText = 'Edit';

      this.editLoading = true;
      //edit data call
      this.editDataSubscribe = this.http.get(this.editApi).subscribe(
        (res:any) => {
          this.editLoading = false;
          console.log("Edit data  res >", res);
          this.model = {
            pkName : res.packageData.pkName,
            pkFname : res.packageData.pkFname,
            pkNusers : res.packageData.pkNusers,
            pkValidityType : res.packageData.pkValidityType,
            pkValidityNum : res.packageData.pkValidityNum,
            pkComment:res.packageData.pkComment,
            instId:res.packageData.instId,
            pkCdate:res.packageData.pkCdate,
          }; 
          this.model.chkdurationyear = moment(res.packageData.pkCdate).format('YYYY-MM-DD');

          console.log('this.model.creatDate', this.model);
          

          // edit data
          this.allEditData = res;
          console.log('this.allEditData', this.allEditData);

          console.log('this.allEditData', this.model);
          
        },
        errRes => {
          // this.selectLoadingDepend = false;
          this.editLoading = false;
        }
      );

    }else{
      this.actionHeaderText = 'Add';
    }
  }
  // ---------- init end ----------
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your data have been saved.',
      duration: 2000,
      cssClass:"my-tost-custom-classsuccess",
    });
    toast.present();
  }

  // Date format change start
  createDate(_date){
    console.log('_date', _date);
    
    this.model.lcCreatDate = moment(_date).format('YYYY/MM/DD');
    console.log('model.lcCreatDate', this.model.lcCreatDate);

    this.model.lcValidityType = '';
    this.model.lcValidityNum = '';
    this.model.lcEndDate = '';
  }
  // Date format change end

  // End date calculation start
  selectCycleDate;
  licValidity;
  licDuration;
  endDateCalculate(_identifier, _value){
    console.log('_identifier', _identifier);
    console.log('_value', _value);
    console.log('this.model.lcCreatDate', this.model.lcCreatDate);

    
    if(_identifier == 'validity'){
      this.licValidity = _value;
    }else if(_identifier == 'duration'){
      this.licDuration = _value;
    }
    console.log('licValidity', this.licValidity);
    console.log('licDuration', this.licDuration);
    
    
    if(this.licValidity && this.licDuration) {
      let createDate = moment(this.model.lcCreatDate).format('DD/MM/YYYY');
      // ----- original date format convert start -----
      let myFormatDate = createDate.split(" ")[0].split("/");
      let _mynewdate = myFormatDate[2] + "-" + myFormatDate[1] + "-" + myFormatDate[0];
      // original date format convert end

      console.log('myFormatDate', myFormatDate);
      console.log('_mynewdate', _mynewdate);
      

      //---- set day + count add start----
      this.selectCycleDate = new Date(_mynewdate);
      // this.selectCycleDate.setDate( this.selectCycleDate.getDate() + 3 );
      if(this.licValidity == 'Years'){
        this.selectCycleDate.setDate( this.selectCycleDate.getDate() + (parseInt(this.licDuration) * 365));
      }else if(this.licValidity == 'Months'){
        this.selectCycleDate.setDate( this.selectCycleDate.getDate() + (parseInt(this.licDuration) * 30));
      }else if(this.licValidity == 'Days'){
        this.selectCycleDate.setDate( this.selectCycleDate.getDate() + parseInt(this.licDuration ));
      }
      
      // alert('this.date >'+this.selectCycleDate);

      this.model.lcEndDate = moment(this.selectCycleDate).format('YYYY/MM/DD');

      console.log('this.model.lcEndDate', this.model.lcEndDate);
      //---- set day + count add end----
    }
    
    
  }
  // End date calculation end

  // ======================== form submit start ===================
  formLoading = false;
  onSubmitForm(form:NgForm){
    console.log("add form submit >", form.value);
    this.formLoading = true;

    let formValue = form.value;

    this.model.lcCreatDate = moment(this.model.lcCreatDate).format('YYYY/MM/DD');
    console.log('model.lcCreatDate', this.model.lcCreatDate);

    this.model.lcEndDate = moment(this.model.lcEndDate).format('YYYY/MM/DD');
    console.log('model.lcEndDate', this.model.lcEndDate);

    // formValue.append('lcCreatDate', this.model.lcCreatDate);
    // formValue.append('lcEndDate', this.model.lcEndDate);
    

    console.log('formValue', formValue);
    

    // get form value
    let fd = new FormData();
    for (let val in form.value) {
      if(form.value[val] == undefined){
        form.value[val] = '';
      }
      fd.append(val, form.value[val]);
    };

    console.log('value >', fd);

    if(!form.valid){
      return;
    }

    if(this.parms_action_name == 'edit'){
      this.formSubmitSubscribe = this.http.put(this.editForm_api, form.value).subscribe(
        (response:any) => {
          this.formLoading = false;
          console.log("add form response >", response);
  
          if(response.status == 200){
            this.commonUtils.presentToast('success', response.message);
            this.router.navigateByUrl('/subscription-package-list');
            form.reset();
          }else {
            this.commonUtils.presentToast('error', response.message);
          }
        },
        errRes => {
          this.formLoading = false;
        }
      );
    }else if(this.parms_action_name == 'add'){
      this.formSubmitSubscribe = this.http.post(this.form_api, form.value).subscribe(
        (response:any) => {
          this.formLoading = false;
          console.log("add form response >", response);
  
          if(response.status == 200){
            this.commonUtils.presentToast('success', response.message);
            this.router.navigateByUrl('/subscription-package-list');
            form.reset();
          }else {
            this.commonUtils.presentToast('error', response.message);
          }
        },
        errRes => {
          this.formLoading = false;
        }
      );
    }

  }
  // form submit end

  // Date format change start
  changeDateFormat(_identifier, _date){
    console.log('_date', _date);
    console.log('_identifier', _identifier);

    if(_identifier == 'startDate') {
      this.model.pkCdate = moment(_date).format('YYYY/MM/DD');
    }

  }
  // Date format change end

  // Disable date field start
  disableDate(){
    return false;
  }
  // Disable date field end
  

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.formSubmitSubscribe !== undefined){
      this.formSubmitSubscribe.unsubscribe();
    }
    if(this.editDataSubscribe !== undefined ){
      this.editDataSubscribe.unsubscribe();
    }
  }
  // destroy subscription end

}
