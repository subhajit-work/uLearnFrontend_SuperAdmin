import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalPage } from '../../modal/modal.page';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { TinymceComponent } from 'ngx-tinymce';
@Component({
  selector: 'app-add-email-notification',
  templateUrl: './add-email-notification.page.html',
  styleUrls: ['./add-email-notification.page.scss'],
})
export class AddEmailNotificationPage implements OnInit {
  @ViewChild(TinymceComponent) private tinyMce: TinymceComponent;
  model: any = {};
  tinyMceConfig: any;
  parms_action_name;
  parms_action_id;
  editApi;
  editForm_api;
  form_api;
  actionHeaderText;
  editLoading = false;
  allEditData;
  formLoading = false;
  alladdTemplateData:any;
  getTemplateFor_api;
  selectFieldVariable;
  private formSubmitSubscribe: Subscription;
  private editDataSubscribe: Subscription;
  private templatefor_get:Subscription;
  private templateTagsGet :Subscription;
  cities = [
    {
      id: 1,  name: 'Vilnius',  avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { 
      id: 2, name: 'Kaunas', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
      id: 3, name: 'Pavilnys', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
      id: 4,  name: 'Siauliai', avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
  ];
  Templates = [];
  setDefaults=[
    {id: 0, name: 'Not Default'},
    {id: 1, name: 'Default'}
  ];
  // selectedCity = this.cities[0].name;
  // selectedType = this.setDefaults[1].name;
  // selectedTemplate = this.Templates[1].name;
  constructor(
    public toastController: ToastController,
    private modalController : ModalController,
    private http : HttpClient,
    private commonUtils: CommonUtils, // common functionlity come here
     private router: Router,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.commonFunction();
  }
  // getTemplatefor start
  getTemplatefor(){
    console.log("HHH");
    this.templatefor_get = this.http.get(this.getTemplateFor_api).subscribe(
        (res:any) => {
          console.log("Get template for  >", res[0].etAction); 
          console.log("Get template for length",res.length);
          this.Templates = res; 
          console.log("Get template for length",this.Templates);

        },
        errRes => {
           console.log("Get template for  >", errRes);  
        }
      );
    
  }
  // getTemplatefor end
  ngsel(value)
  {
    console.log("select",value);
  }
  // commonFunction start 
  commonFunction(){
    // get active url name
    this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);
    let x = this.commonUtils.getPathNameFun(this.router.url.split('/')[1])
    console.log(this.router.url);
    this.parms_action_name = this.activatedRoute.snapshot.paramMap.get('action');
    this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('parms_action_name', this.parms_action_name);
    console.log('parms_action_id', this.parms_action_id);

    this.configureTinyMce();

    this.getTemplateFor_api = 'emailTemplate/getAll/template_for';
    this.getTemplatefor();

    // edit api
    if(this.parms_action_name == 'edit'){
      this.editApi = 'emailTemplate/viewTemplate/'+this.parms_action_id;

      // init call
      this.init();

      this.editForm_api = 'emailTemplate/update/'+this.parms_action_id;
    }

    // form_api Api
    this.form_api = 'emailTemplate/add';
  }
  // commonFunction end
  // ---------- init start ----------
  init(){
    if( this.parms_action_name == 'edit'){
      

      this.editLoading = true;
      //edit data call
      this.editDataSubscribe = this.http.get(this.editApi).subscribe(
        (res:any) => {
          // console.log("Match >", res.etAction); 
          for(let i=0;i<this.Templates.length;i++)
          {
             if(res.etAction == this.Templates[i].etAction)
             {
                console.log("Match >", res.etAction);   
                console.log("Templates >", this.Templates[i].etTags);
             } 
          }
          
          console.log("Edit data  res >", res.return_data);
          this.model = {
            etAction : res.etAction,
            etName : res.etName,
            etSubject : res.etSubject,
            isPrimary : res.isPrimary,
            etBody:res.etBody,
            etType: res.etType
          }; 

          
          this.getTags(res.etAction);

          // edit data
          this.allEditData = res;
          console.log('this.allEditData', this.allEditData);
          this.configureTinyMce();
          this.editLoading = false;
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
  // --------on submit start----------
  onSubmitForm(form:NgForm){
    this.formLoading = true;
    let formValue = form.value;
    console.log(form.value);
    // / get form value
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
            this.router.navigateByUrl('/email-notification-list');
            console.log("response",response)
            form.reset();
          }else {
            this.commonUtils.presentToast('error', response.message);
            console.log("response",response)
          }
          console.log("response",response)
        },
        errRes => {
          this.formLoading = false;
          console.log("errResbb",errRes);
        }
      );
    }
    else if(this.parms_action_name == 'add'){
      this.formSubmitSubscribe = this.http.post(this.form_api, form.value).subscribe(
        (response:any) => {
          this.formLoading = false;
          console.log("add form response >", response);
  
          if(response.status == 200){
            this.commonUtils.presentToast('success', response.message);
            this.router.navigateByUrl('/email-notification-list');
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
  // on submit end
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your data have been saved.',
      duration: 2000,
      cssClass:"my-tost-custom-classsuccess",
    });
    toast.present();
  }
  // AddTemplate start
  async AddTemplate(_identifier, _item, _items) {
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
      // this.presentToast('Package End', 'success');
      if(getdata.data == 'submitClose'){
        /* this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);  */
      }

    });

    return await changePassword_modal.present();
  }
  // AddTemplate end

  // get tags start
  getTags(_action){
    console.log('_action', _action);
    this.selectFieldVariable = '';
    this.templateTagsGet = this.http.get('emailTemplate/getTags/'+_action).subscribe(
      (res:any) => {
        console.log('res', res);
        this.selectFieldVariable = res;

      },
      errRes => {
         console.log("Get tags >", errRes);  
         this.selectFieldVariable = '';
      }
    );
  }
  // get tags end

  // Get selectFieldForMsg start
  selectedVariable;
  selectFieldForTags(_value){
    console.log('_value', _value);
    this.selectedVariable = _value;
    this.configureTinyMce();
  }
  // Get selectFieldForMsg end

  // Text editor start
  configureTinyMce() {
    this.tinyMceConfig = {
      branding: false,
      apiKey: "v420gfv525dl4bzohv4y0qw5tcouix3rq685gumxmji5h17t",
      /**
       * This is needed to prevent console errors
       * if you're hosting your own TinyMCE
       */
      // content_css: 'assets/tinymce/skins/ui/oxide/content.min.css',
      height: 400,
      image_advtab: true,
      imagetools_toolbar: `
        rotateleft rotateright |
        flipv fliph | 
        editimage imageoptions`,
      importcss_append: !0,
      inline: false,
      menubar: true,
      paste_data_images: !0,
      /**
       * This is needed to prevent console errors 
       * if you're hosting your own TinyMCE
       */
      // skin_url: 'assets/tinymce/skins/ui/oxide',
      toolbar: `
        insertText |
        copy undo redo formatselect |
        bold italic strikethrough forecolor backcolor |
        link | alignleft aligncenter alignright alignjustify |
        numlist bullist outdent indent |
        removeformat`,
      setup: (editor) => {
        editor.ui.registry.addButton('insertText', {
          text: 'Press Me To Insert Text!',
          onAction: () => {
            editor.insertContent(this.selectedVariable);
          }
        });
      }
    };
  }
  // text editor end

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.formSubmitSubscribe !== undefined){
      this.formSubmitSubscribe.unsubscribe();
    }
    if(this.editDataSubscribe !== undefined ){
      this.editDataSubscribe.unsubscribe();
    }
    if(this.templateTagsGet !== undefined){
      this.templateTagsGet.unsubscribe();
    }
    if(this.templatefor_get !== undefined ){
      this.templatefor_get.unsubscribe();
    }
  }
  // destroy subscription end
}