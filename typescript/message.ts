
export class Message {
    constructor() { };
    plaintext: string;
    numerictext: string;

    calcnumerictext() {
        if (this.plaintext)
        this.numerictext = JSON.stringify(this.plaintext.split('').map(char => char.charCodeAt(0)));
    }
}