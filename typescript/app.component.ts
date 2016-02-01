import {Component, OnInit} from 'angular2/core';

import {Message} from './message';
import {MessageDetailComponent} from './message-detail.component';
import {RSA} from './rsa';
import {RSADetailComponent} from './rsa-detail.component';
import {TranslationComponent} from './translation-detail.component';

@Component({
  selector: 'my-app',
  templateUrl: '../html/app.html',
  styleUrls: ['../css/app.css'],
  directives: [
      RSADetailComponent, 
      MessageDetailComponent,
      TranslationComponent 
      ],
})

export class AppComponent implements OnInit {
  public title:string = 'Tour of Heroes';
  
  public message: Message;
    
  
  
  ngOnInit() {
    this.message = new Message();
  }
  
}
