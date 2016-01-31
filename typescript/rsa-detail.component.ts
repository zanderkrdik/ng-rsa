import {Component} from 'angular2/core';
import {RSA} from './rsa';

@Component({
    selector: 'rsa-detail',
    templateUrl: '../html/rsa-detail.html',
    styleUrls: ['../css/rsa-detail.css'],
    inputs: ['rsa']
})

export class RSADetailComponent {
    public rsa: RSA;
}
