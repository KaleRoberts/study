// Math and Logic Puzzles

const isPrime = (n) => {
    if(n < 2) {
        return false;
    }

    let sqrt = Math.sqrt(n);
    for(let i = 0; i <= sqrt; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

/*
    The square root of n is sufficient because for every number a which divides n evenly, there is a 
    complement b, where a * b = n.
*/


// Returns a list of all prime numbers between 2 and max number provided
const sieveOfEratosthenes = (max) => {
    const flags = new Array(max + 1);
    let count = 0;

    Array.prototype.setAll = function(v) {
        let n = this.length;
        this[0] = false;
        this[1] = false;
        for(let i = 2; i < n; i++) {
          this[i] = v;
        }
      }

    flags.setAll(true);

    let prime = 2;

    while(prime <= Math.sqrt(max)) {

        /* Cross off remaining multiples of prime */
        crossOff(flags, prime);

        /* Find next value which is true */
        prime = getNextPrime(flags, prime);
    }

    return flags;
}

const crossOff = (flags, prime) => {
    /* Cross off remainig multiples of prime. We can start with (prime * prime)
        because if we have a k * prime, where k < prime, this value would have
        already been crossed off in a prior iteration.
    */
   for(let i = prime * prime; i < flags.length; i += prime) {
       flags[i] = false;
   }
}

const getNextPrime = (flags, prime) => {
    let next = prime + 1;
    while(next < flags.length && !flags[next]) {
        next++;
    }
    return next;
}


/* 6.7 The Apocolypse
    Simulating the family can have children until that have 1 girl

*/

const runNFamilies = (n) => {
    let boys = 0;
    let girls = 0;
    for(let i = 0; i < n; i++) {
        let genders = runOneFamily();
        girls += genders[0];
        boys += genders[1];
    }
    return girls / (boys + girls);
}

const runOneFamily = () => {
    const random = Math.random();
    let boys = 0;
    let girls = 0;
    while(girls === 0) {    // Run until we have a girl
        if(random >= 0.5) {
            girls += 1;
        } else {
            boys += 1;
        }
    }
    let genders = {girls, boys};
    return genders;
}