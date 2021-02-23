<template>
    <ion-page>
        <ion-header>
            <ion-toolbar :style="getNationColor(card.nation)">
                <ion-buttons slot="start">
                    <ion-back-button @click="closeModal()" :icon='chevronBack' style="display: block; color: white;"></ion-back-button>
                </ion-buttons>        
                <ion-title>{{card.name}}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class = 'cardDetail'>
                <img class ='imgDetail' style="margin: auto" :src ="getImageRoute(card.id)">
                <h3 class="titleDetail">{{card.name}}</h3>
                <h6 class="subtitleDetail">{{card.type}}</h6>
                <p id="textDetail"></p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonBackButton, IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, modalController } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { defineComponent } from "vue";



export default defineComponent({
    name: 'CardDetails',
    components: { IonBackButton, IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, },
    setup() {
        return {
        chevronBack
        }
    },
    props:
    {
        card:null,
    },
    data()
    {
        return{
            cardText: ''
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
        getNationColor(n: string)
        {
            let result = '--background: ';
            switch(n)
            {
                case "Dragon Empire":
                    result += "DarkRed;";
                    break;
                case "Ketter Sanctuary":
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
    },
    mounted()
    {
        let text = this.card.skill;
        text = text.replaceAll("[AUTO]", "<span class='tag auto'>[AUTO]</span>")
            .replaceAll("[ACT]", "<span class='tag act'>[ACT]</span>")
            .replaceAll("[CONT]", "<span class='tag cont'>[CONT]</span>")
        
            .replaceAll("COST", "<span class='tag cost'>COST</span>")
            .replaceAll("1/Turn", "<span class='tag oneTurn'>1/Turn</span>")
            
            .replaceAll("(VC)", "<span class='tag circle'>(VC)</span>")
            .replaceAll("(VC/RC)", "<span class='tag circle'>(VC/RC)</span>")
            .replaceAll("(RC)", "<span class='tag circle'>(RC)</span>")
            .replaceAll("(GC)", "<span class='tag circle'>(GC)</span>")

            // .replaceAll("[Power]", "<img src="+this.getIconRoute('power')+" alt:'[Power]' class='icon'></img>")
            // .replaceAll("[Shield]", "<img src="+this.getIconRoute('shield')+" alt:'[Shield]' class='icon'></img>")
            .replaceAll("[Rest]", "<img src="+this.getIconRoute('rest')+" alt:'[Rest]' class='icon'></img>")
            .replaceAll("[Stand]", "<img src="+this.getIconRoute('stand')+" alt:'[Stand]' class='icon'></img>");
        
        this.cardText = text;

        const p = document.getElementById("textDetail");
        if (p !=null)
        {
            p.innerHTML = text;
        }
    }
})
</script>

<style>
ion-title
{
    font-size: 20px;
    font-size: 5vw;
}

.icon
{
    width: 20px !important;
    height: 20px !important;
}

.power
{
    /* background-image: "../../assets/icons/power.png"; */
    background-color: red;
    background-size: contain;
    background-position: center;
}


.tag
{
    border-radius: 2px;
    color: white;
    padding: 1px 4px 1px 4px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.imgDetail
{
    height: auto;
    width: 80%;
    padding-top: 20px;
}
#textDetail
{
    font-size: 20px;
    text-align: left; 
    padding: 0px 30px 20px 30px;
    margin: 0;
}
.titleDetail
{
    text-align: center; 
    font-weight: bold;
    padding: 20px 30px 0px 30px;
    margin: 0;
}
.subtitleDetail
{
    text-align: center; 
    font-style: italic;
    padding: 0px 30px 20px 30px;
    margin: 0;
}

</style>