import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-add-security',
  templateUrl: './add-security.page.html',
  styleUrls: ['./add-security.page.scss'],
})
export class AddSecurityPage implements OnInit {
  model: any = {};
  adrType = "institute"
  country = [
    {
        id: 1,
        name: 'India',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: 'Africa', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'USA',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: 'CANADA',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
  ];
  countryCode = [
    {
        id: 1,
        name: '+91',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: '+12', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: '+96',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: '+85',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
  ];

  state = [
    {
        id: 1,
        name: 'West Bengal',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: 'Tripura', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'Bihar',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: 'Tamil Nadu',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
  ];

  city = [
    {
        id: 1,
        name: 'Kolkata',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: 'Pune', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'Mumbai',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: 'Chennai',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
  ];

  district = [
    {
        id: 1,
        name: 'Howrah',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: 'Hooghly', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'Bardhawan',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: 'Birbhum',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
  ];
  taluka = [
    {
        id: 1,
        name: 'Taluka 1',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: 'Taluka 2', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'Taluka 3',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: 'Taluka 4',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
  ];

  selectedCity = this.city[0].name;
  selectedState = this.state[0].name;
  selectedCountry = this.country[0].name;

  parms_action_name;
  parms_action_id;
  form_api;
  actionHeaderText;
  editLoading = false;
  allEditData;
  editApi;
  editForm_api;
  hide = true;
  hide2 = true;
  private formSubmitSubscribe: Subscription;
  private editDataSubscribe: Subscription;
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

  commonFunction(){
    // get active url name
    this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);
    this.parms_action_name = this.activatedRoute.snapshot.paramMap.get('action');
    this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log('parms_action_name', this.parms_action_name);
    console.log('parms_action_id', this.parms_action_id);

    this.model.amdDob = moment('2021/10/02').format('YYYY-MM-DD');
    console.log('this.model.amdDob', this.model.amdDob);
    
    // edit api
    if(this.parms_action_name == 'edit'){
      this.editApi = 'institute/view/'+this.parms_action_id;

      // init call
      this.init();

      this.editForm_api = 'institute/update/'+this.parms_action_id;
    }else if(this.parms_action_name == 'add'){
      this.model.instMnumCode = '+91';
      this.model.amdMnumCode = '+91';
      
      // form_api Api
      this.form_api = 'institute/add';
    }

    
  }

  // Auto genarate password start
  passwordGenarate(_userName){
    if(_userName && this.parms_action_name == 'add'){
      var randomstring = Math.random().toString(36).slice(-10);
      this.model.amdPassword = randomstring;
      this.model.amdCnfPassword = randomstring;
    }else if(!_userName && this.parms_action_name == 'add'){
      this.model.amdPassword = '';
      this.model.amdCnfPassword = '';
    }
  }
  // Auto genarate password end

  // ---------- init start ----------
  init(){
    if( this.parms_action_name == 'edit'){
      this.actionHeaderText = 'Edit';

      this.editLoading = true;
      //edit data call
      this.editDataSubscribe = this.http.get(this.editApi).subscribe(
        (res:any) => {
          this.editLoading = false;
          console.log("Edit data  res >", res);
          this.model = {
            adrCity : res.instituteAddress[0].adrCity,
            adrCountry : res.instituteAddress[0].adrCountry,
            adrDistrict : res.instituteAddress[0].adrDistrict,
            adrLine1 : res.instituteAddress[0].adrLine1,
            adrLine2 : res.instituteAddress[0].adrLine2,
            adrPincode : res.instituteAddress[0].adrPincode,
            adrState : res.instituteAddress[0].adrState,
            adrTaluka : res.instituteAddress[0].adrTaluka,
            adrType : res.instituteAddress[0].adrType,
            adrId : res.instituteAddress[0].adrId,

            amdCnfPassword : res.instituteAdmin[0].amdPassword,
            amdEmail : res.instituteAdmin[0].amdEmail,
            amdFname : res.instituteAdmin[0].amdFname,
            amdLname : res.instituteAdmin[0].amdLname,
            amdMnum : res.instituteAdmin[0].amdMnum,
            amdPassword : res.instituteAdmin[0].amdPassword,
            amdPpic : res.instituteAdmin[0].amdPpic,
            amdUsername : res.instituteAdmin[0].amdUsername,
            amdDob : res.instituteAdmin[0].amdDob,
            amdId : res.instituteAdmin[0].amdId,

            instEmail : res.instEmail,
            instGstNum : res.instGstNum,
            instLogo : res.instLogo,
            instCnum : res.instCnum,
            instName : res.instName,
            instPanNum : res.instPanNum,
            instWebsite : res.instWebsite,
            instEndDate : res.instEndDate,
            isntRegDate : res.isntRegDate,
            instMnum : res.instMnum,
            instId : res.instId,

          }; 
          
          this.model.chkAmdDob = moment(res.instituteAdmin[0].amdDob).format('YYYY-MM-DD');
          this.model.chkRegDate = moment(res.isntRegDate).format('YYYY-MM-DD');
          this.model.chkEstDate = moment(res.instEndDate).format('YYYY-MM-DD');

          console.log('this.model.amdDob', this.model.amdDob);
          console.log('this.model.isntRegDate', this.model.isntRegDate);
          console.log('this.model.instEndDate', this.model.instEndDate);
          
          
          this.model.instMnumCode = res.instMnum.slice(0,3);
          this.model.instMnumPh = res.instMnum.slice(3);

          this.model.amdMnumCode = res.instituteAdmin[0].amdMnum.slice(0,3);
          this.model.amdMnumPh = res.instituteAdmin[0].amdMnum.slice(3);
          

          // edit data
          this.allEditData = res;
          console.log('this.allEditData', this.allEditData);
          
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

  private imageSrc: string = '';

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
    this.model.instLogo = this.imageSrc;
  }

  // ---------Mobile number code add---------
  mobileNumberCode(_identifier, _purpose, _value){
    if(_identifier == 'onrMobileNumber'){
      let code = this.model.amdMnumCode;
      let number = this.model.amdMnumPh;
      if(_purpose == 'numberCode'){
        code = _value;
      }else if(_purpose == 'number'){
        number = _value;
      }
      console.log('mobile No:', code+number);
      this.model.amdMnum = code+number;

    }else if(_identifier == 'instMobileNumber'){
      let code = this.model.instMnumCode;
      let number = this.model.instMnumPh;
      if(_purpose == 'numberCode'){
        code = _value;
      }else if(_purpose == 'number'){
        number = _value;
      }
      console.log('mobile No:', code+number);
      this.model.instMnum = code+number;

    }
  }
  // ---------Mobile number code end---------

  // Date format change start
  changeDateFormat(_identifier, _date){
    console.log('_date', _date);
    console.log('_identifier', _identifier);

    if(_identifier == 'registrationDate') {
      this.model.isntRegDate = moment(_date).format('YYYY/MM/DD');
    }else if(_identifier == 'establishmentDate'){
      this.model.instEndDate = moment(_date).format('YYYY/MM/DD');
    }else if(_identifier == 'dateOfBirth'){
      this.model.amdDob = moment(_date).format('YYYY/MM/DD');
    }
    
    
    console.log('model.isntRegDate', this.model.isntRegDate);

  }
  // Date format change end

  // ======================== form submit start ===================
  formLoading = false;
  onSubmitForm(form:NgForm){
    console.log("add form submit >", form.value);
    this.formLoading = true;

    let formValue = form.value;
    
    console.log('formValue', formValue);
    

    // get form value
    let fd = new FormData();
    for (let val in form.value) {
      if(form.value[val] == undefined){
        form.value[val] = '';
      }
      fd.append(val, form.value[val]);
    };

    console.log('value >>>', fd);

    if(!form.valid){
      return;
    }
    console.log('Updateing....', this.parms_action_name);
    if(this.parms_action_name == 'edit'){
      console.log('Updateing....');
      
      this.formSubmitSubscribe = this.http.put(this.editForm_api, form.value).subscribe(
        (response:any) => {
          this.formLoading = false;
          console.log("add form response >", response);
  
          if(response.status == 200){
            this.commonUtils.presentToast('success', response.message);
            this.router.navigateByUrl('/security-list');
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
            this.router.navigateByUrl('/security-list');
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

  // Disable date field start
  disableDate(){
    return false;
  }
  // Disable date field end
  ngsel(value)
  {
     console.log('Select >>>', value);
  }  

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
