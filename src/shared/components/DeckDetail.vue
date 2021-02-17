<template>
    <ion-page>
        <ion-header>
        <ion-toolbar>
            <div id='toolbar'>
            <ion-title>{{deck?.name}}</ion-title>
            </div>
        </ion-toolbar>
        </ion-header>
        <ion-content >
            <ion-grid>
                <ion-row>
                <ion-col v-for="c in $options.filters.Filter(cards)" :key="c.id" size="4">
                    <ion-card type="button"  @click="openModal(c)">
                    <img class='cardImage' :src ="getImageRoute(c.id)">
                    <div class="cardDetails">
                        <h4>{{c.name}}</h4>
                    </div>
                    </ion-card>
                </ion-col>
                </ion-row>
            </ion-grid>
            <h3 class='noCards' v-if="cards.length ==0">This Deck is empty</h3>
            <h3 class='noCards' v-else-if="$options.filters.Filter(cards).length ==0">There are no cards that meet those conditions</h3>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, modalController } from '@ionic/vue';

import Decks from "../services/Decks";
import Global from "../services/Global";
import Filters from '../services/Filters';


import CardInfo from "../models/CardInfo";
import CardSlot from "../models/CardSlot";
import Deck from "../models/Deck";

import CardDetail from '@/shared/components/CardDetail.vue';


export default  {
    name: 'DeckDetail',
    components: { IonContent, IonPage },
    data()
    {
        return {
            deckId: this.$route.params.id,
            deck: null as any,
            cards: [] as CardInfo[],

            modalOpen: false
        }
    },
    mounted()
    {
        this.deck = Decks.find(e => e.id == this.deckId) as Deck; 
    
        this.deck.decklist.forEach((e: CardSlot) => {
            const ci = Global.cards.find(r => r.id == e.cardId) as CardInfo;

            this.cards.push(ci);
        });

        console.log(this.cards);
    },
    methods:
    {
        getImageRoute(id: string)
        {
            const images = require.context('@/assets/cardImages/', false, /\.png$/);

            return images('./'+id+'.png');
        },
        async openModal(c: CardInfo) 
        {
            if(this.modalOpen)
                return;

            this.modalOpen = true;
            const modal = await modalController
                .create({
                component: CardDetail,
                cssClass: 'my-custom-class',
                componentProps: {
                    card: c
                },
                });
            modal.present();
            const {data} = await modal.onWillDismiss();
            if(data != null)
                setTimeout(() => {
                this.modalOpen = false;
                }, (500));
        },
    },
    filters:
    {
        Filter(value: any)
        {
        //by nation
        let result = value.filter((e: any) =>
            {
            if(Filters.nations.includes(e.nation))
                return e;
            });
            // console.log(1, result);

        //by name
        result = result.filter((e: any) => 
            {
            if(e.name.toLowerCase().includes(Filters.name.toLowerCase()))
            return e;
            });

            // console.log(2, result);

        //by skill
        result = result.filter((e: any) => 
            {
            if(e.skill.toLowerCase().includes(Filters.skill.toLowerCase()))
            return e;
            });

            // console.log(3, result);

        //by grades
            result = result.filter((e: any) =>
            {
            if(Filters.grades.includes(e.grade))
            return e;
            });
            // console.log(4, result);

        //by power
        result = result.filter((e: any) =>
        {
            if(e.power == Filters.power || Filters.power == '')
            return e;
        });
                    // console.log(5, result);

        //by shield
        result = result.filter((e: any) =>
        {
            if(e.shield == Filters.shield || Filters.shield == '')
            return e;
        });
            // console.log(6, result);

        //by Abilities
        result = result.filter((e: any) =>
            {
            if(Filters.abilities.includes(e.ability))
            return e;
            });
            
        // console.log(7, result);

        //by race
        result = result.filter((e: any) => 
            {
            if(e.race.toLowerCase().includes(Filters.race.toLowerCase()))
            return e;
            });
        // console.log(8, result);

        //by sets
        result = result.filter((e: any) =>
            {
            if(e.sets.some((r: any)=> Filters.sets.indexOf(r) >= 0))
            return e;
            });   
            // console.log(9, result);

        //by keywords
        result = result.filter((e: any) =>
            {
            if(e.keywords.some((r: any)=> Filters.keywords.indexOf(r) >= 0))
            return e;
            });
        // console.log(10, result);

        //by Types
            result = result.filter((e: any) =>
            {
            if(Filters.types.includes(e.type))
            return e;
            });
        // console.log(11, result);

        //by triggers
            result = result.filter((e: any) =>
            {
            if(Filters.trigger.includes(e.trigger))
            return e;
            });
        // console.log(12, result);


        return result;
        }
    }

}
</script>


<style scoped>
.noCards
{
  margin-top: 80%;
  text-align: center;
}

ion-col>ion-card{
  margin: -2px !important;    
  }

.cardDetails
{
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
h4
{
  text-align:center;
  font-size: 15px;
  margin: 0px;
  vertical-align: middle;
}

.cardImage
{
  width: 100%;
}

</style>