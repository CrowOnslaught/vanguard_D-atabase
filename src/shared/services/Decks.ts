import Deck from "../models/Deck";
// import CardSlot from "../models/CardSlot";


// const testCardSlot1: CardSlot = {cardId: "1", amount: 50};
// const testCardSlot2: CardSlot = {cardId: "2", amount: 4};
// const testCardSlot3: CardSlot = {cardId: "3", amount: 2};

// const testCardSlot5: CardSlot = {cardId: "5", amount: 4};
// const testCardSlot6: CardSlot = {cardId: "6", amount: 4};
// const testCardSlot7: CardSlot = {cardId: "7", amount: 4};
// const testCardSlot8: CardSlot = {cardId: "8", amount: 3};


// const testDeck: Deck= {id: "0", name: "Only Vairinas", nation: "Dragon Empire", decklist: [testCardSlot1]};
// const testDeck2: Deck= {id: "1", name: "TestDelk", nation: "Dragon Empire", decklist: [testCardSlot2,testCardSlot3]};
// const testDeck3: Deck= {id: "2", name: "Spike", nation: "Dark States", decklist: [testCardSlot5,testCardSlot6,testCardSlot7,testCardSlot8]};

let Decks: Deck[] = [];

const ls = localStorage.getItem('decks');
if(ls != null)
    Decks =(JSON.parse(ls));

export default Decks;