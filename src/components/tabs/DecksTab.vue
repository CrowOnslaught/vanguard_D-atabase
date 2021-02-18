<template>
  <ion-page>
    <ion-content >
    <ion-list>
      <ion-item v-for="d in decks" :key="d" @click="OpenDeck(d)" >
        <h2>{{d.name}}</h2>
      </ion-item>
    </ion-list>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonList, IonItem } from '@ionic/vue';

import Decks from "../../shared/services/Decks";
import { useRouter } from 'vue-router';


export default  {
  name: 'Decks',
  components: { IonContent, IonPage, IonList, IonItem },
      setup() {
      const router = useRouter();
      return { router };
    },
  data()
  {
    return{
      decks: Decks
    }
  },
  methods:
  {
    OpenDeck(d)
    {
      this.router.push({path: this.getDeckRoute(d)});
    },
    getDeckRoute(d)
    {
      return "decks/" + d.id;
    }
  }

}
</script>