import { Component ,Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Meta, MetaDefinition,Title } from '@angular/platform-browser';
import { MessagingService } from 'src/app/service/messaging.service';
declare let gtag:Function;
declare let fbq:Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loadAPI: Promise<any>;
  show;
  title = 'foodtogo';
  id:any;
  titlewithstore = "";
  callscript = false
  constructor(private router: Router,public dialog: MatDialog,private metaService: Meta, private titleService: Title,private messagingService: MessagingService){




}


}
