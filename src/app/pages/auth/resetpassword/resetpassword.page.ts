import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  isDisabled=true;
  hide = true;
  model: any = {};
  form_api;
  hide2 = true;
  hide3 = true;
  parms_action_name;
  parms_action_id;


  private formSubmitSubscribe: Subscription;

  constructor(
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
    


    // form_api Api
    this.form_api = 'login/resetPassword/'+this.parms_action_name+'/'+this.parms_action_id;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  // ======================== form submit start ===================
  formLoading = false;
  onSubmitForm(form:NgForm){
    console.log("add form submit >", form.value);
    this.formLoading = true;
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

    this.formSubmitSubscribe = this.http.post(this.form_api, form.value).subscribe(
      (response:any) => {
        this.formLoading = false;
        console.log("add form response >", response);

        if(response.status == 200){
          this.commonUtils.presentToast('success', response.message);
          this.router.navigateByUrl('/auth');
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
  // form submit end
  

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.formSubmitSubscribe !== undefined){
      this.formSubmitSubscribe.unsubscribe();
    }
  }
  // destroy subscription end

}
