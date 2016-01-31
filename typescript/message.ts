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

}

