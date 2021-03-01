<template>
  <ion-page>
    <ion-content   >
    <ion-list class="itemDeckTab">
      <ion-item class="itemDeckTab" v-for="d in decks" :key="d" @click="OpenDeck(d)"  >
        <h2>{{d.name}}</h2>
        <img slot="end" class="nationImage" :src="getNationImage(d.nation)" :alt="d.nation">
      </ion-item>
    </ion-list>

    <ion-button id="optionBut" @click="newDeck()"> <ion-icon :icon="add"></ion-icon></ion-button>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonList, IonItem, IonButton, IonIcon, modalController } from '@ionic/vue';
import { add } from 'ionicons/icons';

import Decks from "../../shared/services/Decks";
import { useRouter } from 'vue-router';
import NewDeck from '@/shared/components/modals/NewDeck.vue';
import Global from '@/shared/services/Global';


export default  {
  name: 'Decks',
  components: { IonContent, IonPage, IonList, IonItem, IonButton, IonIcon },
      setup() {
      const router = useRouter();
      return { router, add };
    },
  data()
  {
    return{
      decks: Decks
    }
  },
  methods:
  {
    async newDeck()
    {
      const modal = await modalController.create({
        component: NewDeck,
        cssClass: 'small-modal-newDeck',
        enableBackdropDismiss: true,
      });

      await modal.present();
      
      const {data} = await modal.onWillDismiss();
      
      if(data != null)
        setTimeout(() => {
          this.createEmptyDeck(data);
        }, (500));
    },
    createEmptyDeck(d)
    {
      //createID
      let currentId = 0;
      let newId = '';
      while (newId == '')
      {
        if(this.decks.find(e => e.id == currentId.toString()))
          currentId++;
        else
          newId = currentId.toString();
      }

      d.id = newId;
      Decks.push(d);
      this.decks = Decks;

      this.$forceUpdate();
      localStorage.setItem('decks', JSON.stringify(this.decks));

        Global.currentDeck = Decks[Decks.length-1];
    },
    OpenDeck(d)
    {
      this.router.push({path: this.getDeckRoute(d)});
    },
    getDeckRoute(d)
    {
      return "decks/" + d.id;
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
    }
  }

}

</script>

<style scoped>

.nationImage
{
  height: 30px;
  width: auto;
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

ion-list, ion-item
{
  background-color: rgba(255, 0, 0, 0);
  --background: transparent;
}

</style>

