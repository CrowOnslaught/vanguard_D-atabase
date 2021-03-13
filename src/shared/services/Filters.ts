import * as data from "../../assets/cardInfo.json";
import CardInfo from "../models/CardInfo";

const Filters = {
    name: "",
    skill: "",
    nations: data.nations,
    grades: [0, 1, 2, 3, 4],
    power: "",
    shield: "",
    abilities: data.abilities,
    race: "",
    sets: data.sets,
    keywords: data.keywords,
    types: data.types,
    trigger: data.triggers,
    newFilters: true,

    setDefault() {
        this.name = "";
        this.skill = "";
        this.nations = data.nations;
        this.grades = [0, 1, 2, 3, 4];
        this.power = "";
        this.shield = "";
        this.abilities = data.abilities;
        this.race = "";
        this.sets = data.sets;
        this.keywords = data.keywords;
        this.types = data.types;
        this.trigger = data.triggers;
    },

    Filter(value: any[]) {
        //by nation
        let result = value.filter((e: CardInfo) => {
            if (this.nations.includes(e.nation)) return e;
        });
        // // console.log(1, result);

        //by name
        result = result.filter((e: CardInfo) => {
            if (e.name.toLowerCase().includes(this.name.toLowerCase())) return e;
        });

        // // console.log(2, result);

        //by skill
        result = result.filter((e: CardInfo) => {
            if (e.skill.toLowerCase().includes(this.skill.toLowerCase())) return e;
        });

        // // console.log(3, result);

        //by grades
        result = result.filter((e: CardInfo) => {
            if (this.grades.includes(e.grade)) return e;
        });
        // // console.log(4, result);

        //by power
        result = result.filter((e: CardInfo) => {
            if (e.power == Number(this.power) || this.power == "") return e;
        });
        // // console.log(5, result);

        //by shield
        result = result.filter((e: CardInfo) => {
            if (e.shield == Number(this.shield) || this.shield == "") return e;
        });
        // // console.log(6, result);

        //by Abilities
        result = result.filter((e: CardInfo) => {
            if (this.abilities.includes(e.ability)) return e;
        });

        // // console.log(7, result);

        //by race
        result = result.filter((e: CardInfo) => {
            if (e.race.toLowerCase().includes(this.race.toLowerCase())) return e;
        });
        // // console.log(8, result);

        //by sets
        result = result.filter((e: CardInfo) => {
            if (e.sets.some((r: any) => this.sets.indexOf(r) >= 0)) return e;
        });
        // // console.log(9, result);

        //by keywords
        result = result.filter((e: CardInfo) => {
            if (e.keywords.some((r) => this.keywords.indexOf(r) >= 0)) return e;
        });
        // // console.log(10, result);

        //by Types
        result = result.filter((e: CardInfo) => {
            if (this.types.includes(e.type)) return e;
        });
        // // console.log(11, result);

        //by triggers
        result = result.filter((e: CardInfo) => {
            if (this.trigger.includes(e.trigger)) return e;
        });
        // // console.log(12, result);

        return result;
    },
};

export default Filters;
