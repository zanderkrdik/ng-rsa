// imports
import {Component, OnInit} from 'angular2/core';
import {Message} from './message';
import {MessageDetailComponent} from './message-detail.component';
import {RSA} from './rsa';
import {RSADetailComponent} from './rsa-detail.component';
import {TranslationComponent} from './translation-detail.component';

@Component({
  selector: 'my-app',
  templateUrl: '../html/app.html',
  styleUrls: [],
  directives: [
      RSADetailComponent, 
      MessageDetailComponent,
      TranslationComponent 
      ],
})

export class AppComponent implements OnInit {
  public message: Message;
  ngOnInit() {
    this.message = new Message();
  }
  
}
