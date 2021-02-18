import * as data from '../../assets/cardInfo.json';
import CardInfo from '../models/CardInfo';

import Decks from './Decks';

const cards: CardInfo[] = data.cards;


const Global = 
{
    cards : cards,
    nations: data.nations,
    races: data.races,
    abilities: data.abilities,
    types: data.types,
    triggers: data.triggers,
    keywords :data.keywords,
    sets: data.sets,
    grades: [0, 1, 2, 3, 4],

    currentDeck: Decks.length>0? Decks[0] : null,
};

export default Global;