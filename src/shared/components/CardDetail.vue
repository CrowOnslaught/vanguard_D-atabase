<template>
    <ion-page>
        <ion-header>
            <ion-toolbar :style="getNationColor(currentCard.nation, '--background: ')">
                <ion-buttons slot="start">
                    <ion-back-button @click="closeModal()" :icon='chevronBack' style="display: block; color: white;"></ion-back-button>
                </ion-buttons>        
                <ion-title>{{currentCard.name}}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content id="background">
            <div class = 'cardDetail'>
                <img class ='imgDetail' :src ="getImageRoute(currentCard.id)">
                <h3 class="titleDetail">{{currentCard.name}}</h3>
                <h6 class="subtitleDetail">{{currentCard.type}}</h6>
                <p id="textDetail"></p>
            </div>

            <ion-button id="addToDeckBut" :style="getNationColor(currentCard.nation, '--background: ')" @click="addToDeckModal(currentCard)"> <ion-icon :icon="add"></ion-icon></ion-button>
            <ion-button v-if='currentIndex != 0' fill="clear" id="previousCard" :style="getNationColor(currentCard.nation, 'color: ')" @click="swipeCard(false)"> <ion-icon :icon="chevronBackCircle"></ion-icon></ion-button>
            <ion-button v-if='currentIndex != cardList.length-1' fill="clear" id="nextCard" :style="getNationColor(currentCard.nation, 'color: ')" @click="swipeCard(true)"> <ion-icon :icon="chevronForwardCircle"></ion-icon></ion-button>
            <ion-item-divider :style="getNationColor(currentCard.nation, '--background: ')" class="footer">
                <p><span class="set" v-for="(s, i) of currentCard.sets" :key="i">{{s}}</span></p>
            </ion-item-divider>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonBackButton, IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonItemDivider, modalController } from '@ionic/vue';

import { chevronBack, add, chevronForwardCircle, chevronBackCircle } from 'ionicons/icons';
import { defineComponent } from "vue";
import CardInfo from '../models/CardInfo';
import Global from '../services/Global';
import AddToDeckVue from './modals/AddToDeck.vue';



export default defineComponent({
    name: 'CardDetails',
    components: { IonBackButton, IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonItemDivider},
    setup() {
        return {
        chevronBack, add, chevronForwardCircle, chevronBackCircle
        }
    },
    props:
    {
        card:null,
        cardList: null,
        index: null
    },
    data()
    {
        return{
            cardText: '',
            currentIndex: this.index,
            currentCard: this.card
        }
    },
    methods:
    {
        closeModal() {
            modalController.dismiss({flag: true});          
        },
        getImageRoute(id: string)
        {
            const images = require.context('@/assets/cardImages/', false, /\.png$/);
            return images('./'+id+'.png');
        },
        getIconRoute(name: string)
        {
            const images = require.context('@/assets/icons/', false, /\.png$/);
            return images('./'+name+'.png').toString();
        },
        getNationColor(n: string, propiertie: string)
        {
            let result = propiertie;
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
        async addToDeckModal(c: CardInfo)
        {
            if(Global.currentDeck == null)
                return;

            const modal = await modalController
                .create({
                component: AddToDeckVue,
                cssClass: 'small-modal-addToDeck',
                componentProps: {
                    card: c,
                },
                });
            modal.present();
        },
        setCardText()
        {
            let text = this.currentCard.skill;
            text = text.replaceAll("[AUTO]", "<span class='tag auto'>[AUTO]</span>")
                .replaceAll("[ACT]", "<span class='tag act'>[ACT]</span>")
                .replaceAll("[CONT]", "<span class='tag cont'>[CONT]</span>")
            
                .replaceAll("COST", "<span class='tag cost'>COST</span>")
                .replaceAll("1/Turn", "<span class='tag oneTurn'>1/Turn</span>")
                
                .replaceAll("(VC)", "<span class='tag circle'>(VC)</span>")
                .replaceAll("(VC/RC)", "<span class='tag circle'>(VC/RC)</span>")
                .replaceAll("(RC)", "<span class='tag circle'>(RC)</span>")
                .replaceAll("(GC)", "<span class='tag circle'>(GC)</span>")
                .replaceAll("(RC/GC)", "<span class='tag circle'>(RC/GC)</span>")

                .replaceAll("[Power]", "<img src="+this.getIconRoute('power')+" alt:'[Power]' class='icon'></img>")
                .replaceAll("[Shield]", "<img src="+this.getIconRoute('shield')+" alt:'[Shield]' class='icon'></img>")
                .replaceAll("[Rest]", "<img src="+this.getIconRoute('rest')+" alt:'[Rest]' class='icon card'></img>")
                .replaceAll("[Stand]", "<img src="+this.getIconRoute('stand')+" alt:'[Stand]' class='icon card'></img>")
                .replaceAll("[Critical]", "<img src="+this.getIconRoute('crit')+" alt:'[Critical]' class='icon card'></img>")
                .replaceAll("[Front]", "<img src="+this.getIconRoute('front')+" alt:'[Front]' class='icon card'></img>");
            
            this.cardText = text;

            const p = document.getElementById("textDetail");
            if (p !=null)
            {
                p.innerHTML = text;
            }
        },
        swipeCard(forward: boolean)
        {
            this.currentIndex += forward? 1 : -1;
            this.currentCard = this.cardList[this.currentIndex];
            this.setCardText();
        }
    },
    mounted()
    {
        this.setCardText();
        console.log(this.card)
    }
})
</script>

<style >

ion-title
{
    font-size: 20px;
    font-size: 5vw;
}

#addToDeckBut
{
    position: fixed;
    bottom: 10px;
    right: 10px;

    --border-radius	: 50%;
    width: 50px;
    height: 50px;

    --ionicon-stroke-width: 100px;
}

#previousCard
{
    position: absolute;
    font-size: 30px;
    padding: 0;
    margin: 0;
    top: 450px;
    left: -30px;

}

#nextCard
{
    position: absolute;
    font-size: 30px;
    padding: 0;
    margin: 0;
    top: 450px;
    right: -30px;
}

.icon
{
    width: 20px !important;
    height: 20px !important;
}

.card
{
    margin-bottom: -4px;
}

.power
{
    background-color: red;
    background-size: contain;
    background-position: center;
}


.tag
{
    border-radius: 2px;
    color: white;
    padding: 1px 3px 1px 3px;
}

.act
{
    background-color: blue;
}
.cont
{
    background-color: red;

}
.auto
{
    background-color: green;

}
.cost
{
    background-color: black;
    border: solid white 1px;
    padding: 1px 2px 1px 2px;

}
.oneTurn
{
    background-color: darkmagenta;
}

.circle
{
    color: goldenrod;
}

.cardDetail{

    background-color:  transparent;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    min-height: 691px;

}
.imgDetail
{
    height: auto;
    width: 80%;
    padding-top: 20px;
    margin-top: 0px;
}
#textDetail
{
    font-size: 16px;
    text-align: justify; 
    padding: 0px 30px 20px 30px;
    margin-bottom: 30px;
}
.titleDetail
{
    text-align: center; 
    font-weight: bold;
    padding: 20px 40px 0px 40px;
    font-size: 20px;
    margin: 0;
}
.subtitleDetail
{
    text-align: center; 
    font-style: italic;
    padding: 0px 30px 20px 30px;
    margin: 0;
}

.footer
{
    width: fit-content;
    max-width: 78%;
    padding: 0 20px 0 20px;

}

.set:not(:last-child)::after
{
    content: " | ";
}

</style>