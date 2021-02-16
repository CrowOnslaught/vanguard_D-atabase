import * as data from '../../assets/cardInfo.json';
import CardInfo from '../models/CardInfo';

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

    printInfo : () =>
    {
        console.log(data);
    }
};

export default Global;