<template>
  <ion-page>
    <ion-content >
    <ion-list>
      <ion-item v-for="d in decks" :key="d" @click="OpenDeck(d)">
        <h2>{{d.name}}</h2>
      </ion-item>
    </ion-list>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from '@ionic/vue';

import Decks from "../../shared/services/Decks";
import Deck from '@/shared/models/Deck';

export default  {
  name: 'Decks',
  components: { IonContent, IonPage },
  data()
  {
    return{
      decks: Decks
    }
  },
  methods:
  {
    OpenDeck(d: Deck)
    {
      this.$router.push('decks/decklist/'+ d.id);

    }
  }

}
</script>