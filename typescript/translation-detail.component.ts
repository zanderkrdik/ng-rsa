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
    @Input() rsa: RSA;
    public title:string;
    public action: string;
    public ascii: number[];
    public crypt: string;

    /**
     * asciiencrypt
     * Convert a `string` to an ascii `number[]`
     */
    asciiencrypt(str: string) {
        this.ascii = str.split('').map(char => char.charCodeAt(0));
        this.crypt = JSON.stringify(this.ascii);
    }

    /**
     * asciidecrypt
     * Convert an ascii `number[]` to a `string`
     */
    asciidecrypt(str: string) {
        //TODO: fix this so it does not encrypt for the sake of decryption.
        this.asciiencrypt(str);
        this.crypt = this.ascii.map(char => String.fromCharCode(char)).join("");
    }

    /**
     * rsaencrypt
     * Convert an ascii `number[]` into a RSA encrypted `number[]`
     */
    rsaencrypt(str: string) {
        var self = this;
        //TODO: fix this so it does not encrypt for the sake of decryption.
        this.asciiencrypt(str);
        this.ascii = this.ascii.map(function(i) {
            return bigInt(i).pow(self.rsa.public_key[1]).mod(self.rsa.public_key[0]).toJSNumber();
        });
        this.crypt = JSON.stringify(this.ascii);
    }

    /**
     * rsadecrypt
     * Convert a RSA encrypted `number[]` into an ascii `number[]`
     */
    rsadecrypt(str: string) {
        var self = this;
        //TODO: fix this so it does not encrypt for the sake of decryption.
        this.rsaencrypt(str);
        this.ascii = this.ascii.map(function(i) {
            return bigInt(i).pow(self.rsa.private_key).mod(self.rsa.public_key[0]).toJSNumber();
        });
        this.crypt = JSON.stringify(this.ascii);
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        console.log(changes);
        if (changes['rsa']) {
            return;
        }
        if (!changes['text'].currentValue) {
            this.ascii = [];
            this.crypt = JSON.stringify(this.ascii);
            return;
        }
        switch (this.action) {
            case "ascii-encrypt":
                this.asciiencrypt(changes['text'].currentValue);
                break;
            case "ascii-decrypt":
                this.asciidecrypt(changes['text'].currentValue);
                break;
            case "rsa-encrypt":
                this.rsaencrypt(changes['text'].currentValue);
                break;
            case "rsa-decrypt":
                this.rsadecrypt(changes['text'].currentValue);
                break;
            default:
        }
    }
}

    
