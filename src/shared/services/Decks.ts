import CardSlot from "../models/CardSlot";
import Deck from "../models/Deck";


const testCardSlot: CardSlot = {cardId:"1", amount:50};
const testDeck: Deck ={id:"0", name:"Only Vairinas", nation:"Dragon Empire", decklist: [testCardSlot]};

const Decks: Deck[] = [testDeck];

export default Decks;