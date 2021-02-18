import CardSlot from "../models/CardSlot";
import Deck from "../models/Deck";


const testCardSlot: CardSlot = {cardId: "1", amount: 50};
const testCardSlot2: CardSlot = {cardId: "2", amount: 4};
const testCardSlot3: CardSlot = {cardId: "3", amount: 2};
const testDeck: Deck= {id: "0", name: "Only Vairinas", nation: "Dragon Empire", decklist: [testCardSlot]};
const testDeck2: Deck= {id: "1", name: "TestDelk", nation: "Dragon Empire", decklist: [testCardSlot2,testCardSlot3]};

const Decks: Deck[] = [testDeck, testDeck2];

export default Decks;