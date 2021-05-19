<template>
    <ion-item class="optionDeckItem" v-if="openSlotsInDeck>=1">
        <ion-button fill="clear"  @click="addToDeck(1)"> Add 1 to {{currentDeck.name}} </ion-button>
    </ion-item>
    <ion-item class="optionDeckItem" v-if="openSlotsInDeck>=2">
        <ion-button fill="clear"  @click="addToDeck(2)"> Add 2 to {{currentDeck.name}} </ion-button>
    </ion-item>
    <ion-item class="optionDeckItem" v-if="openSlotsInDeck>=3">
        <ion-button fill="clear"  @click="addToDeck(3)"> Add 3 to {{currentDeck.name}} </ion-button>
    </ion-item>
    <ion-item class="optionDeckItem" v-if="openSlotsInDeck>=4">
        <ion-button fill="clear"  @click="addToDeck(4)"> Add 4 to {{currentDeck.name}} </ion-button>
    </ion-item>
    <ion-item class="optionDeckItem" v-if="openSlotsInDeck<=3">
        <ion-button fill="clear"  @click="removeFromDeck(1)"> Remove 1 from {{currentDeck.name}} </ion-button>
    </ion-item>
    <ion-item class="optionDeckItem" v-if="openSlotsInDeck<=2">
        <ion-button fill="clear"  @click="removeFromDeck(2)"> Remove 2 from {{currentDeck.name}} </ion-button>
    </ion-item>
    <ion-item class="optionDeckItem" v-if="openSlotsInDeck<=1">
        <ion-button fill="clear"  @click="removeFromDeck(3)"> Remove 3 from {{currentDeck.name}} </ion-button>
    </ion-item>
    <ion-item class="optionDeckItem" v-if="openSlotsInDeck<=0">
        <ion-button fill="clear"  @click="removeFromDeck(4)"> Remove 4 from {{currentDeck.name}} </ion-button>
    </ion-item>
    <ion-item v-if='card.setCode.length > 1' class="setSelector">
        <ion-label>Set:</ion-label>
        <ion-select v-model="selectedSet">
            <ion-select-option v-for="n in card.setCode" :key="n" :value='n'>{{n}}</ion-select-option>
        </ion-select>    
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" class="cancel" @click="close()"> Close </ion-button>
    </ion-item>
</template>

<script>

import { IonItem, IonButton, modalController, IonSelect, IonLabel, IonSelectOption } from '@ionic/vue';
import Global from '@/shared/services/Global';
import Decks from '@/shared/services/Decks';

export default {
    name:'AddToDeck',
    components: { IonItem, IonButton, IonSelect, IonSelectOption, IonLabel},
    data()
    {
        return{
            currentDeck: Global.currentDeck,
            openSlotsInDeck: 4,
            selectedSet: this.card.setCode[0]
        }
    },
    props:
    {
        card:null,
    },
    computed:{
        cardIdCode: function()
        {
            if(this.card.id.includes('|'))
                return this.card.id;

            return this.card.id + "|" + this.selectedSet;
        }
    },
    watch:
    {
        selectedSet: function()
        {
            this.checkAmountInDeck();
        }
    },
    mounted()
    {
        this.checkAmountInDeck();
    },
    methods:
    {
        addToDeck(n)
        {
            const cardSlot = this.currentDeck.decklist.find((e) => e.cardId == this.cardIdCode)
            if(cardSlot != undefined)
                cardSlot.amount +=n;
            else
            {
                const cs = {cardId: this.cardIdCode, amount:n, inRideDeck: false};
                this.currentDeck.decklist.push(cs);
            }

            localStorage.setItem('decks', JSON.stringify(Decks));
            this.close();
        },
        removeFromDeck(n)
        {
            const cardSlot = this.currentDeck.decklist.find((e) => e.cardId == this.cardIdCode)
            if(cardSlot != undefined)
            {
                cardSlot.amount -=n;
                if(cardSlot.amount <=0)
                {
                    const cardSlotIndex = this.currentDeck.decklist.findIndex((e) => e.cardId == this.card.id);
                    this.currentDeck.decklist.splice(cardSlotIndex, 1);
                }
            }

            localStorage.setItem('decks', JSON.stringify(Decks));
            this.close();        
        },
        checkAmountInDeck()
        {
            console.log(this.cardIdCode)
            const cardSlot = this.currentDeck.decklist.find((e) => e.cardId == this.cardIdCode)
            if(cardSlot == undefined)
                this.openSlotsInDeck = 4;
            else
                this.openSlotsInDeck = 4- cardSlot.amount;
        },
        close()
        {
            modalController.dismiss({flag:true});
        }
    }

}
</script>

<style>
.cancel{
    color:red;
    text-align: center;
    width: 100%;
}


.optionDeckItem
{
    font-size: 15px;
}

.setSelector
{
    color: red;
    text-align: left;
}

.buttons
{
    align-items: center;
}

</style>