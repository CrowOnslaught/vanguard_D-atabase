<template>
    <ion-page>
        <ion-header >
        <ion-toolbar :style="getNationColor(deck.nation)">
                <ion-buttons slot="start">
                    <ion-back-button @click="back()" :icon='chevronBack' style="display: block; color: white;"></ion-back-button>
                </ion-buttons>   
                <ion-title>{{deck?.name}}</ion-title>
                <ion-buttons slot='end'>
                    <p class="deckAmount">{{deckAmount}}/50</p>
                    <img class='nationImage' :src="getNationImage(deck.nation)" :alt="deck.nation">
                </ion-buttons> 
        </ion-toolbar>
        </ion-header>
        <ion-header>
                        <ion-item>
                <div class="deckStats">
                <div class="deckStatItem">
                    <h4>G0:</h4>
                    <p>{{grades0}}</p>
                </div>
                <div class="deckStatItem">
                    <h4>G1:</h4>
                    <p>{{grades1}}</p>
                </div>
                <div class="deckStatItem">
                    <h4>G2:</h4>
                    <p>{{grades2}}</p>
                </div>
                <div class="deckStatItem">
                    <h4>G3:</h4>
                    <p>{{grades3}}</p>
                </div>
                <div class="deckStatItem">
                    <h4>Sentinels:</h4>
                    <p>{{sentinels}}/4</p>
                </div>
                <div class="deckStatItem">
                    <h4>Triggers:</h4>
                    <p>{{triggers}}/16</p>
                    <p>{{heals}}/4</p>
                </div>
                </div>
            </ion-item>
        </ion-header>
        <ion-content >
            <ion-grid>
                <ion-row>
                    <ion-col v-for="c in $options.filters.Filter(cards)" :key="c.id" size="5.5">
                        <p>{{getCardAmountInDeck(c.id)}}x</p>
                        <ion-card type="button"  @click="openModal(c)" @contextmenu="addToDeckModal(c)">
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

            <ion-button id="optionBut" @click="options()"> <ion-icon :icon="ellipsisVertical"></ion-icon></ion-button>

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons,IonBackButton, IonTitle, IonItem, IonGrid, IonRow, IonCol, IonCard, IonIcon, IonButton, modalController, alertController  } from '@ionic/vue';
import { chevronBack, ellipsisVertical } from 'ionicons/icons';

import Decks from "../services/Decks";
import Global from "../services/Global";
import Filters from '../services/Filters';


import CardDetail from '@/shared/components/CardDetail.vue';
import DeckOptions from '@/shared/components/modals/DeckOptions.vue';
import AddToDeckVue from '@/shared/components/modals/AddToDeck.vue';




export default  {
    name: 'DeckDetail',
    components: { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonItem, IonGrid, IonRow, IonCol, IonCard, IonIcon, IonButton,  },
    setup() {
        return {
            chevronBack, ellipsisVertical
        }
    },
    data()
    {
        return {
            deckId: this.$route.params.id,
            deck: {id: "", name: "", nation: "", decklist: []},
            cards: [],
            deckAmount: 0,

            grades0:0,
            grades1:0,
            grades2:0,
            grades3:0,
            sentinels:0,
            triggers:0,
            heals:0,

            modalOpen: false,
        }
    },
    mounted()
    {
        this.deck = Decks.find(e => e.id == this.deckId); 
    
        this.deck.decklist.forEach((e) => {
            const ci = Global.cards.find(r => r.id == e.cardId);

            this.cards.push(ci);
        });

        Global.currentDeck = this.deck;

        this.reload();
    },
    ionViewWillEnter()
    {    
        this.reload();
    },
    methods:
    {
        sortDeck( a, b ) 
        {
            //By grade            
            if ( a.grade > b.grade ){
                return -1;
            }
            if ( a.grade < b.grade ){
                return 1;
            }

            //By power            
            if ( a.power > b.power ){
                return -1;
            }
            if ( a.power < b.power ){
                return 1;
            }

            //By Unit type            
            if ( a.type == "Normal Unit" && b.type != "Normal Unit" ){
                return -1;
            }
            if ( a.type != "Normal Unit" && b.type == "Normal Unit" ){
                return 1;
            }

            //Sort by trigger Tipe
            if ( a.type == "Trigger Unit" && a.type == "Trigger Unit" ){
                if(a.trigger == 'Over' && (b.trigger != 'Over'))
                    return -1
                if(a.trigger == 'Critical' && (b.trigger != 'Over' && b.trigger != 'Critical'))
                    return -1
                if(a.trigger == 'Front'  && (b.trigger != 'Over' && b.trigger != 'Critical' && b.trigger != 'Front'))
                    return -1
                if(a.trigger == 'Draw' && (b.trigger != 'Over' && b.trigger != 'Critical' && b.trigger != 'Front') && b.trigger != 'Draw')
                    return -1
                if(a.trigger == 'Heal')
                    return 1
            }

            //Sort by amount
            if(a.amount != undefined && b.amount != undefined)
            {
                if(a.amount > b.amount)
                    return -1;
                if(a.amount < b.amount)
                    return 1;
            }

            //sort by id
            if(a.id < b.id)
                return -1;

            if(a.id > b.id)
                return 1;


        },
        reload()
        {
            this.deckAmount = 0;
            this.cards = [];

            this.grades0=0;
            this.grades1=0;
            this.grades2=0;
            this.grades3=0;
            this.sentinels=0;
            this.triggers=0;
            this.heals=0;


            this.deck.decklist.forEach((e) => {
                const ci = Global.cards.find(r => r.id == e.cardId);
                ci.amount = e.amount;
                this.cards.push(ci);

                if(ci.grade == 0)
                    this.grades0+= e.amount;
                else if (ci.grade == 1)
                    this.grades1+= e.amount;
                else if (ci.grade == 2)
                    this.grades2+= e.amount;
                else if (ci.grade == 3)
                    this.grades3+= e.amount;

                if((ci.trigger != 'None'))
                {
                    this.triggers+= e.amount;
                    if(ci.trigger == 'Heal')
                        this.heals+= e.amount;
                }
                if(ci.keywords.includes('Sentinel'))
                    this.sentinels += e.amount;

                this.deckAmount+= e.amount;
            });

            this.cards = this.cards.sort(this.sortDeck);

            this.$forceUpdate();
        },
        async addToDeckModal(c)
        {
            const modal = await modalController
                .create({
                component: AddToDeckVue,
                cssClass: 'small-modal-addToDeck',
                componentProps: 
                    {
                        card: c
                    },
                });
            modal.present();

            const {data} = await modal.onWillDismiss();
            if(data != null)
            {
                this.reload();
            }
        },
        async options()
        {
            const modal = await modalController.create({
                component: DeckOptions,
                cssClass: 'small-modal-optionDeck',
                enableBackdropDismiss: true,
                componentProps: {
                    deck: this.deck
                },
            });

            await modal.present();
            
            const {data} = await modal.onWillDismiss();
            
            if(data != null)
                if(data.flag == 'delete')
                    this.deleteDeck();
        },
        getCardAmountInDeck(id)
        {
            const result = this.deck.decklist.find(e => e.cardId == id);
            if(result != undefined)
                return result.amount;
            else 
                return 0;
        },
        getNationImage(n)
        {
            const images = require.context('@/assets/nationImages/', false, /\.png$/);

            let result = '';
            switch(n)
            {
                case "Dragon Empire":
                    result = images('./DE.png');
                    break;
                case "Keter Sanctuary":
                    result = images('./KS.png');
                    break;
                case "Dark States":
                    result = images('./DS.png');
                    break;
                case "Stoicheia":
                    result = images('./S.png');
                    break;
                case "Brandt Gate":
                    result = images('./BG.png');
                    break;
                case "Lyrical Monasterio":
                    result = images('./LM.png');
                    break;

            }
            return result;
        },
        getNationColor(n)
        {
            let result = '--background: ';
            switch(n)
            {
                case "Dragon Empire":
                    result += "DarkRed;";
                    break;
                case "Keter Sanctuary":
                    result += "DarkGoldenRod;";
                    break;
                case "Dark States":
                    result += "DarkBlue;";
                    break;
                case "Stoicheia":
                    result += "DarkGreen;";
                    break;
                case "Brandt Gate":
                    result += "LightSlateGrey;";
                    break;
                case "Lyrical Monasterio":
                    result += "HotPink;";
                    break;

            }
            return result;
        },
        getImageRoute(id)
        {
            const images = require.context('@/assets/cardImages/', false, /\.png$/);

            return images('./'+id+'.png');
        },
        async openModal(c) 
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
        back()
        {
            this.$router.back();
        },
        async deleteDeck()
        {
            const alert = await alertController
                .create({
                cssClass: 'small-modal-delete',
                header: `Delete ${this.deck.name}?`,
                buttons: [
                    {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'

                    },
                    {
                    text: 'Okay',
                    handler: () => {
                        const index = Decks.findIndex( e=> e.id == this.deckId);
                        if(index < 0)
                            return;

                        Decks.splice(index,1);

                        localStorage.setItem('decks', JSON.stringify(Decks));
                        if(this.deck == Global.currentDeck)
                            Global.currentDeck = Decks.length > 0? Decks[0] : null;

                        this.back();                    
                        },
                    },
                ],
                });
            alert.present();
        },

    },
    filters:
    {
        Filter(value)
        {
        //by nation
        let result = value.filter((e) =>
            {
            if(Filters.nations.includes(e.nation))
                return e;
            });
            // console.log(1, result);

        //by name
        result = result.filter((e) => 
            {
            if(e.name.toLowerCase().includes(Filters.name.toLowerCase()))
            return e;
            });

            // console.log(2, result);

        //by skill
        result = result.filter((e) => 
            {
            if(e.skill.toLowerCase().includes(Filters.skill.toLowerCase()))
            return e;
            });

            // console.log(3, result);

        //by grades
            result = result.filter((e) =>
            {
            if(Filters.grades.includes(e.grade))
            return e;
            });
            // console.log(4, result);

        //by power
        result = result.filter((e) =>
        {
            if(e.power == Filters.power || Filters.power == '')
            return e;
        });
                    // console.log(5, result);

        //by shield
        result = result.filter((e) =>
        {
            if(e.shield == Filters.shield || Filters.shield == '')
            return e;
        });
            // console.log(6, result);

        //by Abilities
        result = result.filter((e) =>
            {
            if(Filters.abilities.includes(e.ability))
            return e;
            });
            
        // console.log(7, result);

        //by race
        result = result.filter((e) => 
            {
            if(e.race.toLowerCase().includes(Filters.race.toLowerCase()))
            return e;
            });
        // console.log(8, result);

        //by sets
        result = result.filter((e) =>
            {
            if(e.sets.some((r)=> Filters.sets.indexOf(r) >= 0))
            return e;
            });   
            // console.log(9, result);

        //by keywords
        result = result.filter((e) =>
            {
            if(e.keywords.some((r)=> Filters.keywords.indexOf(r) >= 0))
            return e;
            });
        // console.log(10, result);

        //by Types
            result = result.filter((e) =>
            {
            if(Filters.types.includes(e.type))
            return e;
            });
        // console.log(11, result);

        //by triggers
            result = result.filter((e) =>
            {
            if(Filters.trigger.includes(e.trigger))
            return e;
            });
        // console.log(12, result);


        return result;
        }
    },  
}
</script>


<style scoped>
.noCards
{
    margin-top: 80%;
    text-align: center;
}

.deckStats
{
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
}

.deckStatItem
{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 50px;

    padding-left: 10px;
    padding-right: 10px;
    margin: 0;
}
.deckStatItem:not(:last-child)
{
    border-right: 1px solid gray;
}

.deckStatItem>p, .deckStatItem>h3, .deckStatItem>h4
{
    margin: 0;
    padding: 0;
    text-align: center;
}

ion-col
{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
ion-col>p
{
    margin-right: 10px;
    font-size: 30px;
}

ion-card{
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

.nationImage
{
    height: 20px;
    width: auto;
    padding-right: 10px;
}

#optionBut
{
    position: fixed;
    bottom: 10px;
    right: 10px;

    --border-radius	: 50%;
    width: 50px;
    height: 50px;

  --ionicon-stroke-width: 100px;
}

.deckAmount
{
    font-weight: bold;
    margin-right: 10px;
}

</style>