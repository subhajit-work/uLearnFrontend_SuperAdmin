import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  isDisabled=true;
  hide = true;
  model: any = {};
  getOtpApi;
  private formSubmitSubscribe: Subscription;
  private getOtpDataSubscribe: Subscription;

  constructor(
    public menuCtrl: MenuController,
    private http : HttpClient,
    private commonUtils: CommonUtils, // common functionlity come here
  ) { }

  ngOnInit() {
    this.commonFunction();
  }

  commonFunction(){
    // Get Otp Api
    this.getOtpApi = 'login/mailForgotPasswordLink';
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  // ---------- getOtpCode fetch start ----------
  otpLoading = false;
  getOtpCode(_email){
    console.log('Email', _email);
    this.otpLoading = true;
    //edit data call
    this.getOtpDataSubscribe = this.http.get(this.getOtpApi+'/'+_email).subscribe(
      (res:any) => {
        this.otpLoading = false;
        console.log("Edit data  res >", res);
        if(res.status == 200){
          this.commonUtils.presentToast('success', res.message);
        }else {
          this.commonUtils.presentToast('error', res.message);
        }
        
      },
      errRes => {
        // this.selectLoadingDepend = false;
        this.otpLoading = false;
      }
    );
  }
  // ---------- getOtpCode fetch end ----------

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.formSubmitSubscribe !== undefined){
      this.formSubmitSubscribe.unsubscribe();
    }
    if(this.getOtpDataSubscribe !== undefined ){
      this.getOtpDataSubscribe.unsubscribe();
    }
  }
// destroy subscription end

}
