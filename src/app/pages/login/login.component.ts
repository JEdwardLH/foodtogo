import { Component, OnInit ,Inject} from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service'
import { FormsModule  } from "@angular/forms";
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;
  screenWidth = window.innerWidth;
  email:string;
  password:string;
  invalidcreds: boolean;
  click = false
  user: SocialUser;
  loggedIn: boolean;
  lang:string;
  message = ""
  constructor(private LoginService: LoginService,private authService: SocialAuthService, private StringTServiceL: StringTService,public dialog: MatDialog) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })

  }

  ngOnInit(): void {


  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(ErroDialog, {
      width: '300px',
      data: { errormessage: errormessage }
    });

    dialogRef.afterClosed().subscribe(result => {



      if (result == "done") {
        document.getElementById("openModalPayment").click();
      } else if (result == "verify") {
        document.getElementById("openModalUser").click();
      }

    });
  }
  claimgift(){
    const headers = {  'Content-Type': 'application/json' }
    const body = { email: this.email,lang:"en"};
    this.LoginService.claimgift(body,headers).subscribe((data: any)=>{

      if(data.code == 200){
        this.click=true
        this.openDialog("Thank you! To claim your gift, download our app, register and use your coupon!")
        if(data.data ==""){

        }else{

        }
      }else{
        this.openDialog(data.message)
      }

    },(error: any) =>{

    })
  }
}
@Component({
  selector: 'checkoutdialog',
  templateUrl: 'dialog.html',
})
export class ErroDialog {
  message: any
  constructor(
    public dialogRef: MatDialogRef<ErroDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LoginComponent) {
    this.message = this.data
  }

  close(): void {
    this.dialogRef.close("done");


  }



}
