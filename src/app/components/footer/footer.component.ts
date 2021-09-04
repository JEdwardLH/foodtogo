import { Component, HostListener, Inject,EventEmitter, OnInit, Input,Output,ViewChild, ElementRef, NgZone } from '@angular/core';

import { DOCUMENT } from '@angular/common';
// import { PressComponent } from '../../pages/press/press.component';
// import { SupportComponent } from '../../pages/support/support.component';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})



export class FooterComponent implements OnInit {
// LANGUAGE
chatbox_div:boolean=false;

chatOptions = {
    items: 3,
    margin: 15,
    dots: false,
    stagePadding: 30,
    autoWidth:true,
    nav: false
  };

chatboxclick(){
  this.chatbox_div = ! this.chatbox_div;
}

isEnglish = true

  topPosToStartShowing = 50;

  constructor(private StringTServiceL: StringTService) {

   }

gotoTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }
  ngOnInit(): void {


  }

}
