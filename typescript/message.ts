import {RSA} from "./RSA";

export class Message {
    constructor(rsa:RSA) {
        this.rsa = rsa;
     };
    plaintext: string;
    asciitext: string;
    modasciitext: string;
    decasciitext: string;
    dec_message: string;
    rsa: RSA;

    _default_numerictext: string = "[]";

    calcnumerictext() {
        if (this.plaintext) {
            var ascii = this.plaintext.split('').map(char => char.charCodeAt(0));
            var self = this;
            var modascii = ascii.map(function(i) { 
                return bigInt(i).pow(self.rsa.public_key[1]).mod(self.rsa.public_key[0]).toJSNumber();
            });
            var decascii = modascii.map(function(i) { 
               return bigInt(i).pow(self.rsa.private_key).mod(self.rsa.public_key[0]).toJSNumber();
            });
            var decascii2 = decascii.map(char => String.fromCharCode(char));
            this.asciitext = JSON.stringify(ascii);
            this.modasciitext = JSON.stringify(modascii);
            this.decasciitext = JSON.stringify(decascii);
            this.dec_message = decascii2.toString();
        } else {
            this.asciitext = this._default_numerictext;
            this.modasciitext = this._default_numerictext;
            this.decasciitext = this._default_numerictext;
        }
    }
}

