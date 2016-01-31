import {Output, EventEmitter, Component, OnInit} from 'angular2/core';
import {RSA} from './rsa';

@Component({
    selector: 'rsa-detail',
    templateUrl: '../html/rsa-detail.html',
    styleUrls: ['../css/rsa-detail.css'],
    inputs: ['rsa'], 
})

export class RSADetailComponent {
    public rsa: RSA;
    @Output() changeevent = new EventEmitter<RSA>();
    
    onGenerate() {
        this.rsa = new RSA();
        this.changeevent.emit(this.rsa);
    }
    ngOnInit() {
        this.rsa = new RSA();
        this.changeevent.emit(this.rsa);
    }
    
}
