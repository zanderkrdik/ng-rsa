

export class Message {
    constructor() { };
    plaintext: string;
    asciitext: string;
    modasciitext: string;
    decasciitext: string;
    dec_message: string;
    rsa: RSA = new RSA();

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

export class RSA {
    primes: number[];
    public_key: number[];
    private_key: number;
    constructor() {
        this.generate();
    }

    /**
     * Generates a random prime
     *
     * @param   {min} int, minimal value
     * @param   {max} int, maximal value
     * @returns {int} a random generated prime
     */
    random_prime(min, max) {
        var p = Math.floor(Math.random() * ((max - 1) - min + 1)) + min;
        console.log(p);
        if(bigInt(p).isPrime()===true){
            return p;
        } else {
            return this.random_prime(min, max);   
        } 
    }

    /**
     * Calculate modular multiplicative inverse.
     * https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
     * Function based on PHP variant on http://rosettacode.org/wiki/Modular_inverse
     *
     * @param   {a} int
     * @param   {n} int
     * @returns {int} Result of modular multiplicative inverse.
     */
    modular_multiplicative_inverse(a, n) {
        var t = 0,
            nt = 1,
            r = n,
            nr = a % n;
        if (n < 0) {
            n = -n;
        }
        if (a < 0) {
            a = n - (-a % n);
        }
        while (nr !== 0) {
            var quot = (r / nr) | 0;
            var tmp = nt; nt = t - quot * nt; t = tmp;
            tmp = nr; nr = r - quot * nr; r = tmp;
        }
        if (r > 1) { return -1; }
        if (t < 0) { t += n; }
        return t;
    }

    generate() {
        // generate values
        var p = this.random_prime(1, 255), // 8 bit
            q = this.random_prime(1, 255), // 8 bit
            n = p * q,
            t = (p - 1) * (q - 1), // totient as φ(n) = (p − 1)(q − 1)
            e = this.random_prime(1, t),
            d = this.modular_multiplicative_inverse(e, t);
        this.public_key = [n,e];
        this.private_key = d;
    }

}
