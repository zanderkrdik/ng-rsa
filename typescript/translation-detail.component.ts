import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import {RSA} from './rsa';

@Component({
    selector: 'translation',
    templateUrl: '../html/translation.html',
    styleUrls: ['../css/translation.css'],
    inputs: ['text', 'action', 'rsa', 'title'],
})

export class TranslationComponent implements OnChanges {
    @Input() text: string;
    public rsa: RSA;
    public title:string;
    public action: string;
    public ascii: number[];
    public asciitext: string;


    asciiencrypt(str: string) {
        this.title = "To Ascii";
        this.ascii = str.split('').map(char => char.charCodeAt(0));
        this.asciitext = JSON.stringify(this.ascii);
    }

    rsaencrypt(str: string) {
        var self = this;
        this.ascii = this.ascii.map(function(i) {
            return bigInt(i).pow(self.rsa.public_key[1]).mod(self.rsa.public_key[0]).toJSNumber();
        });
        this.asciitext = JSON.stringify(this.ascii);
    }

    decrypt(str: string) {
        this.ascii = str.split('').map(char => char.charCodeAt(0));
        this.asciitext = JSON.stringify(this.ascii);
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (!changes['text'].currentValue) {
            this.ascii = [];
            this.asciitext = JSON.stringify(this.ascii);
            return;
        }
        switch (this.action) {
            case "ascii-encrypt":
                this.asciiencrypt(changes['text'].currentValue);
                break;
            case "rsa-encrypt":
                this.rsaencrypt(changes['text'].currentValue);
                break;
            case "decrypt":
                this.decrypt(changes['text'].currentValue);
                break;
            default:
        }
    }
}

    
