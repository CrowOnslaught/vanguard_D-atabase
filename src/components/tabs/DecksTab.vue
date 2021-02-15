<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Decks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content >

    <p>this is the deck component</p>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default  {
  name: 'Decks',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>