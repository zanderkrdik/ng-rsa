import {EventEmitter, Component, Input, Output, OnChanges, SimpleChange, ViewEncapsulation} from 'angular2/core';
import {RSA} from './rsa';

@Component({
    selector: 'translation',
    templateUrl: '../html/translation.html',
    styleUrls: ['../css/translation.css'],
    inputs: ['text', 'action', 'rsa', 'title', 'ciphertext'],
    encapsulation: ViewEncapsulation.None

})

export class TranslationComponent implements OnChanges {
    @Input() rsa: RSA;
    public title:string;
    public action: string;
    @Input() ciphertext: string;
    public deciphertext: string;
    @Output() changeevent = new EventEmitter<String>();

    /**
     * asciiencrypt
     * Convert a `string` to an ascii `number[]`
     */
    asciiencrypt(str: string) {
        var ascii = str.split('').map(char => char.charCodeAt(0));
        this.deciphertext = JSON.stringify(ascii);
        this.changeevent.emit(this.deciphertext);
    }

    /**
     * asciidecrypt
     * Convert an ascii `number[]` to a `string`
     */
    asciidecrypt(json: string) {
        this.deciphertext = JSON.parse(json).map(char => String.fromCharCode(char)).join("");
        this.changeevent.emit(this.deciphertext);
    }

    /**
     * rsaencrypt
     * Convert an ascii `number[]` into a RSA encrypted `number[]`
     */
    rsaencrypt(json: string) {
        var self = this;
        var rsaJSON = JSON.parse(json).map(function(i) {
            return bigInt(i).pow(self.rsa.public_key[1]).mod(self.rsa.public_key[0]).toJSNumber();
        });
        this.deciphertext = JSON.stringify(rsaJSON);
        this.changeevent.emit(this.deciphertext);
    }

    /**
     * rsadecrypt
     * Convert a RSA encrypted `number[]` into an ascii `number[]`
     */
    rsadecrypt(json: string) {
        var self = this;
        var asciiJSON = JSON.parse(json).map(function(i) {
            return bigInt(i).pow(self.rsa.private_key).mod(self.rsa.public_key[0]).toJSNumber();
        });
        this.deciphertext = JSON.stringify(asciiJSON);
        this.changeevent.emit(this.deciphertext);
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        //console.log(changes);
        if (changes['rsa']) {
            return;
        }
        if (!changes['ciphertext'].currentValue) {
            //TODO: set some default values
            return;
        }
        switch (this.action) {
            case "ascii-encrypt":
                this.asciiencrypt(changes['ciphertext'].currentValue);
                break;
            case "ascii-decrypt":
                this.asciidecrypt(changes['ciphertext'].currentValue);
                break;
            case "rsa-encrypt":
                this.rsaencrypt(changes['ciphertext'].currentValue);
                break;
            case "rsa-decrypt":
                this.rsadecrypt(changes['ciphertext'].currentValue);
                break;
            default:
        }
    }
}

    
