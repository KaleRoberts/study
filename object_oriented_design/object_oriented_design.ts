/* 7.1 Deck of Cards
    Design the data structures for a generic deck of cards. Explain how you would
    subclass the data structures to implement blackjack.
 */

 class Deck {
     [x: string]: any;
     constructor(size) {
         this.size = size;
     }
 }

class Card {
    type: string;
    value: string;
    constructor(type, value) {
        return {
            value,
            type
        };
    }

}

 class Royal {

 }

enum Suit {
    Club,
    Diamond,
    Heart,
    Spade
}

