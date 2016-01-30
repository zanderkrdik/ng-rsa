import {Component} from 'angular2/core';
import {Message} from './message';
@Component({
  selector: 'message-detail',
  template: `
      <h2>Message</h2>
      <div>
        <label>message: </label>
        <input [(ngModel)]="message.plaintext" placeholder="The plaintext message" (input)="message.calcnumerictext()"/>
      </div>
        <div><label>plaintext: </label>{{message.plaintext}}</div>
        <div><label>numerictext: </label>{{message.numerictext}}</div>
  `,
  inputs: ['message']
})
export class MessageDetailComponent {
  public message: Message;
}
