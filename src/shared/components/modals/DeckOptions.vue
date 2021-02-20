<template>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear"  @click="cancel()"> Copy deck to Clipboard (WIP)</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear"  @click="cancel()"> Import Deck (WIP)</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" @click="deleteDeck()"> Delete Deck</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" @click="cancel()"> Generate Decklist (WIP)</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear"  @click="cancel()"> Generate Proxy Deck (WIP)</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" class="cancel" @click="cancel()"> Close </ion-button>
    </ion-item>
</template>

<script lang='ts'>

import { IonItem, IonButton, modalController } from '@ionic/vue';

export default {
    name:'DeckOptions',
    components: { IonItem, IonButton},
    methods:
    {
        deleteDeck()
        {
            modalController.dismiss({flag:'delete'});
        },
        cancel()
        {
            modalController.dismiss();
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

.buttons
{
    align-items: center;
}

</style>