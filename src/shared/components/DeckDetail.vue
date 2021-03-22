<template>
    <ion-page>
        <ion-header >
        <ion-toolbar :style="getNationColor(deck.nation, '--background: ')">
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
                    <ion-col v-for="(c, i) in filteredDeck" :key="c.id" size="6">
                        <div class='cardSideInfo'>
                            <ion-label v-if="c.type == 'Normal Unit'" position="stacked" :style="getNationColor(deck.nation, 'color: ')">Ride <br> Deck</ion-label>
                            <ion-checkbox v-if="c.type == 'Normal Unit'" :id='setCheckBoxId(c.id)' @click="onCheckBox(c.grade, c.id)" :style="getNationColor(deck.nation, '--background-checked: ')"></ion-checkbox>
                            <p>{{getCardAmountInDeck(c.id)}}x</p>
                        </div>
                        <ion-card type="button"  @click="openModal(c, i)" @contextmenu="addToDeckModal(c)">
                            <img class='cardImage' :src ="getImageRoute(c)">
                            <div class="cardDetails">
                                <h4>{{c.name}}</h4>
                            </div>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <h3 class='noCards' v-if="cards.length ==0">This Deck is empty</h3>
            <h3 class='noCards' v-else-if="filteredDeck.length ==0">There are no cards that meet those conditions</h3>

            <ion-button id="optionBut" :style="getNationColor(deck.nation, '--background: ')" @click="options()"> <ion-icon :icon="ellipsisVertical"></ion-icon></ion-button>

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons,IonBackButton, IonTitle, IonItem, IonGrid, IonRow, IonCol, IonCard, IonIcon, IonCheckbox, IonLabel, IonButton, modalController, alertController  } from '@ionic/vue';
import { chevronBack, ellipsisVertical } from 'ionicons/icons';

import Decks from "../services/Decks";
import Global from "../services/Global";
import Filters from '../services/Filters';


import CardDetail from '@/shared/components/CardDetail.vue';
import DeckOptions from '@/shared/components/modals/DeckOptions.vue';
import AddToDeckVue from '@/shared/components/modals/AddToDeck.vue';




export default  {
    name: 'DeckDetail',
    components: { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonItem, IonGrid, IonRow, IonCol, IonCard, IonCheckbox, IonLabel, IonIcon, IonButton,  },
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

            rideDeck: [undefined,undefined,undefined,undefined],

            grades0:0,
            grades1:0,
            grades2:0,
            grades3:0,
            sentinels:0,
            triggers:0,
            heals:0,

            modalOpen: false,
            filteredDeck: []
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
    ionViewDidEnter() 
    {
    // Put here the code you want to execute
        try
        {
            this.rideDeck.forEach(e =>
            {
                if(e != undefined)
                    document.getElementById(`checkBox${e}`).checked = true;
            });
        }
        catch(e)
        {
            console.log(e);
        }
    },
    methods:
    {
        onCheckBox(grade, id)
        {
            // const checkBox = 

            if(this.rideDeck[grade] == undefined) // No card in ridedek
            {
                this.rideDeck[grade] = id;
            }
            else //There is a card in ride deck
            {
                console.log(this.rideDeck[grade], id);
                if(this.rideDeck[grade] == id) //You clicked the same card
                    this.rideDeck[grade] = undefined;
                else //you clicked another card of the same grade as the already assigned
                {
                    const removedId = this.rideDeck[grade];

                    const ci = this.deck.decklist.find(e => e.cardId == removedId);
                    ci.inRideDeck =  false;

                    document.getElementById(`checkBox${removedId}`).checked = false;
                    this.rideDeck[grade] = id;
                }
            }

            const ci = this.deck.decklist.find(e => e.cardId == id);
            ci.inRideDeck =  this.rideDeck[grade] == id;

            localStorage.setItem('decks', JSON.stringify(Decks));
            // document.getElementById(`checkBox${id}`).checked = true;
            console.log(this.rideDeck);

        },
        setCheckBoxId(id)
        {
            return `checkBox${id}`;
        },
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

            this.rideDeck = [undefined,undefined,undefined,undefined],

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
                ci.inRideDeck = e.inRideDeck == undefined? false : e.inRideDeck;
                this.cards.push(ci);

                if(ci.inRideDeck)
                {
                    this.rideDeck[ci.grade] = ci.id;
                    //console.log(document.getElementById(`checkBox${ci.id}`), `checkBox${ci.id}`);
                }
                //     document.getElementById(`checkBox${e.cardId}`).checked = true;
                // console.log(ci.name, ci.inRideDeck);

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
            this.filteredDeck = Filters.Filter(this.cards);

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
                    deck: this.deck,
                    cardList: this.cards,
                    rideDeck: this.rideDeck
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
        getNationColor(n, p)
        {
            let result = p;
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
                default:
                    result += "rgb(30, 30, 30);";
                    break;

            }
            return result;
        },
        getImageRoute(c)
        {
            let result = '';
            try
            {
                const images = require.context('@/assets/cardImages/', false, /\.jpg$/);
                result = images('./'+c.id+'.jpg');
            }
            catch(err)
            {
                result = c.image;
            }
            return result;
        },
        async openModal(c, i) 
        {
            if(this.modalOpen)
                return;

            this.modalOpen = true;
            const modal = await modalController
                .create({
                component: CardDetail,
                cssClass: 'card-detail-modal',
                componentProps: {
                    card: c,
                    cardList: this.filteredDeck,
                    index: i
                },
                });
            modal.present();

            await modal.onWillDismiss();
            setTimeout(() => {
                this.reload();
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
}
</script>


<style scoped>

ion-row
{
    width: 95%;
    margin: auto;

    /* display: flex;
    justify-content: center; */
}

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

ion-card
{
    margin: -2px !important;    
}

.cardSideInfo
{
    height: 116px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.cardSideInfo>p
{
    width: 36px;
    font-size: 20px;
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
    width: 132px;
    height: 191.66px;
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

ion-checkbox
{
    margin-top: 15px;
    margin-right: 10px ;
    --border-color-checked: white;
    --border-color: white;
}

</style>