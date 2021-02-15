<template>
  <ion-page>
      <ion-toolbar>
        <ion-title>Header</ion-title>
      </ion-toolbar>
  </ion-page>
</template>

<script lang="ts">
import { IonPage } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonPage },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  }
}
</script>