<template>
  <ion-page>
    <ion-content >
      <ion-grid>
        <ion-row>
          <ion-col v-for="(c, i) in sortDeck" :key="c.id" size="4">
            <ion-card type="button"  @click="openModal(c, i)" @contextmenu="addToDeckModal(c)">
              <img class='cardImage' :src ="getImageRoute(c)">
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
  computed:
  {
    sortDeck: function()
    {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.data.sort(this.sort);
    }
  },
  methods:
  {
    sort(a, b)
    {
      const filter = Filters.order;
      const inverse = filter.startsWith('-')? -1 : 1;

      //By name
      if(filter.endsWith('name'))  
      {
        if ( a.name > b.name ){
            return -1 * inverse;
        }
        if ( a.name < b.name ){
            return 1 *inverse;
        }
      }    

      //By set
      if(filter.endsWith('setCode'))  
      {
        if ( a.setCode > b.setCode ){
            return -1 * inverse;
        }
        if ( a.setCode < b.setCode ){
            return 1 *inverse;
        }
      }    

      //By grade     
      if(filter.endsWith('grade'))  
      {
        if ( a.grade > b.grade ){
            return -1 * inverse;
        }
        if ( a.grade < b.grade ){
            return 1 *inverse;
        }
      }     

      if(filter.endsWith('id'))
      {
        //sort by id
        if(Number(a.id) < Number(b.id))
            return -1 *inverse;
  
        if(Number(a.id) > Number(b.id))
            return 1 *inverse;
      }  

    },
    async addToDeckModal(c)
    {
      if(Global.currentDeck == null)
        return;

      const modal = await modalController
        .create({
          component: AddToDeckVue,
          cssClass: 'small-modal-addToDeck',
          componentProps: {
            card: c,
          },
        });
      modal.present();
    },
    getImageRoute(c)
    {
      let result = '';
      try
      {
        const images = require.context('@/assets/cardImages/', false, /\.jpg$/);
        result = images('./'+c.id+'.jpg');
      }
      catch(err)
      {
        result = c.image;
      }
      return result;
    },
    async openModal(c, i) 
    {
      if(this.modalOpen)
        return;

      this.modalOpen = true;
      const modal = await modalController
        .create({
          component: CardDetail,
          cssClass: 'card-detail-modal',
          componentProps: {
            card: c,
            cardList: this.data,
            index: i
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
  min-height: 168.52px;
}
</style>