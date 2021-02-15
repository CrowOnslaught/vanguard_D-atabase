<template>
  <ion-page>
    <ion-content >
      <ion-grid>
        <ion-row>
          <ion-col v-for="c in data" :key="c.id" size="6">
            <ion-card type="button"  @click="openModal(c)">
              <img :src ="getImageRoute(c.id)">
              <h4 style="text-align:center">{{c.name}}</h4>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, modalController } from '@ionic/vue';
import Global from '../../shared/services/Global'

import CardInfo from '@/shared/models/CardInfo';
import CardDetail from '@/shared/components/CardDetail.vue';

export default  {
  name: 'Cards',
  components: {IonContent, IonPage },
  data()
  {
    return{
      data : Global.cards,
    }
  },
  methods:
  {
    getImageRoute(id: string)
    {
      const images = require.context('@/assets/cardImages/', false, /\.png$/);


      return images('./'+id+'.png');
    },
    async openModal(c: CardInfo) {
      const modal = await modalController
        .create({
          component: CardDetail,
          cssClass: 'my-custom-class',
          componentProps: {
            card: c
          },
        })
      return modal.present();
    },
  }
}
</script>