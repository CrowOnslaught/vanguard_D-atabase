<template>
  <ion-page>
    <ion-content >
      <ion-grid>
        <ion-row>
          <ion-col v-for="c in data" :key="c.id" size="4">
            <ion-card type="button"  @click="openModal(c)" @contextmenu="addToDeckModal(c)">
              <img class='cardImage' :src ="getImageRoute(c.id)">
              <div class="cardDetails">
                <h4>{{c.name}}</h4>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <h3 class='noCards' v-if="data.length ==0">There are no cards that meet those conditions</h3>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonGrid, IonCol, IonRow, IonCard, modalController } from '@ionic/vue';
import Global from '../../shared/services/Global';
import Filters from '../../shared/services/Filters';

import CardDetail from '@/shared/components/CardDetail.vue';
import AddToDeckVue from '@/shared/components/modals/AddToDeck.vue';

export default  {
  name: 'Cards',
  components: {IonContent, IonPage, IonGrid, IonCol,IonRow, IonCard },
  data()
  {
    return{
      data : Global.cards,
      modalOpen: false
    }
  },
  ionViewWillEnter()
  {
      this.data = Filters.Filter(Global.cards);
   },
  methods:
  {
    async addToDeckModal(c)
    {
      if(Global.currentDeck == null)
        return;

      const modal = await modalController
        .create({
          component: AddToDeckVue,
          cssClass: 'small-modal-addToDeck',
          componentProps: {
            card: c
          },
        });
      modal.present();
    },
    getImageRoute(id)
    {
      const images = require.context('@/assets/cardImages/', false, /\.png$/);

      return images('./'+id+'.png');
    },
    async openModal(c) 
    {
      if(this.modalOpen)
        return;

      this.modalOpen = true;
      const modal = await modalController
        .create({
          component: CardDetail,
          cssClass: 'my-custom-class',
          componentProps: {
            card: c
          },
        });
      modal.present();
      
      await modal.onWillDismiss();
      setTimeout(() => {
        this.modalOpen = false;
      }, (500));

    },
  }
}
</script>

<style scoped>
.noCards
{
  margin-top: 80%;
  text-align: center;
}

ion-col>ion-card{
  margin: -2px !important;    
  }

.cardDetails
{
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
h4
{
  text-align:center;
  font-size: 15px;
  margin: 0px;
  vertical-align: middle;
}

.cardImage
{
  width: 100%;
}
</style>