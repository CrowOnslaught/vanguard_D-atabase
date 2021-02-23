<template>
            <ion-item class="newDeckItem">
                <h1>Create Deck</h1>
            </ion-item>
            <ion-item class="newDeckItem">
                <ion-label>Name:</ion-label>
                <ion-input placeholder="Name" maxlength=10 v-model="selectedName"></ion-input>
            </ion-item>
            <ion-item class="newDeckItem">
                <ion-label>Nation:</ion-label>
                <ion-select v-model="selectedNation">
                    <ion-select-option v-for="n in nations" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item lines="none" class="newDeckItem buttons">
                <ion-button fill="clear" @click="cancel()"> Cancel</ion-button>
                <ion-button slot='end' fill="clear" :disabled="selectedNation == '' || selectedName == ''" @click="createDeck()"> Create</ion-button>
            </ion-item>
</template>

<script>

import { IonSelect, IonSelectOption, IonInput, IonItem, IonButton, IonLabel, modalController } from '@ionic/vue';
import Global from '@/shared/services/Global';

export default {
    name:'NewDeck',
    components: { IonSelect, IonSelectOption, IonInput, IonItem, IonButton, IonLabel},
    data()
    {
        return{
            nations: Global.nations.splice(0,Global.nations.length-1),
            selectedName: '',
            selectedNation: ''
        }
    },
    methods:
    {
        createDeck()
        {
            modalController.dismiss({id: '', name: this.selectedName, nation: this.selectedNation, decklist: []});
        },
        cancel()
        {
            modalController.dismiss();
        }
    }

}
</script>

<style>
h1{
    margin: 20px 20px 10px 20px;
    text-align: center;
    width: 100%;
}


.newDeckItem
{
    --min-height: 60px;
}

.buttons
{
    align-items: center;
}

</style>