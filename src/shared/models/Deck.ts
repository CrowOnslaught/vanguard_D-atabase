import CardSlot from "./CardSlot";

export default interface Deck
{
    id: string;
    name: string;
    nation: string;
    decklist: CardSlot[];
}
