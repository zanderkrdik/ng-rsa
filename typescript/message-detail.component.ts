import {Component} from 'angular2/core';
import {Message} from './message';
@Component({
  selector: 'message-detail',
  template: `
      <h2>Message</h2>
      <div>
        <label>message: </label>
        <input [(ngModel)]="message.plaintext" placeholder="The plaintext message" (keydown)="message.calcnumerictext()"/>
      </div>
        <div><label>plaintext: </label>{{message.plaintext}}</div>
        <div><label>ASCII: </label>{{message.asciitext}}</div>
  `,
  inputs: ['message']
})
export class MessageDetailComponent {
  public message: Message;
}
