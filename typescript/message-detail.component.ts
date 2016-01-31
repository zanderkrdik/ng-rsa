import {Component, ViewEncapsulation} from 'angular2/core';
import {Message} from './message';

@Component({
    selector: 'message-detail',
    templateUrl: '../html/message.html',
    styleUrls: ['../css/message.css'],
    inputs: ['message'],
    encapsulation: ViewEncapsulation.None
})

export class MessageDetailComponent {
    public message: Message;
}
