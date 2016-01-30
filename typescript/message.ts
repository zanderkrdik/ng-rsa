
export class Message {
    constructor() { };
    plaintext: string;
    asciitext: string;

    _default_numerictext: string = "[]";

    calcnumerictext() {
        if (this.plaintext) {
            this.asciitext = JSON.stringify(this.plaintext.split('').map(char => char.charCodeAt(0)));
        console.log('calc json');
        } else {
            this.asciitext = this._default_numerictext;
        console.log('calc default');
        }
    }
}