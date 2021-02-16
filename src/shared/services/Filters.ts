import * as data from '../../assets/cardInfo.json';


const Filters = 
{
    name: '',
    skill: '',
    nations: data.nations,
    grades: [0,1,2,3,4],
    power: '',
    shield: '',
    abilities: data.abilities,
    race: '',
    sets: data.sets,
    keywords: data.keywords,
    types: data.types,
    trigger: data.triggers,

    setDefault()
    {
        this.name= '';
        this.skill= '';
        this.nations= data.nations;
        this.grades= [0,1,2,3,4];
        this.power= '';
        this. shield= '';
        this.abilities= data.abilities;
        this.race= '';
        this.sets= data.sets;
        this.keywords= data.keywords;
        this.types= data.types;
        this.trigger= data.triggers;
    }
};

export default Filters;