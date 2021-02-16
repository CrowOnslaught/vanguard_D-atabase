<template>
  <ion-page>
    <ion-content >
      <ion-grid>
        <ion-row>
          <ion-col v-for="c in $options.filters.Filter(data)" :key="c.id" size="4">
            <ion-card type="button"  @click="openModal(c)">
              <img :src ="getImageRoute(c.id)">
              <div class="cardDetails">
                <h4>{{c.name}}</h4>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <h3 class='noCards' v-if="$options.filters.Filter(data).length ==0">There are no cards that meet those conditions</h3>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, modalController } from '@ionic/vue';
import Global from '../../shared/services/Global';
import Filters from '../../shared/services/Filters';

import CardDetail from '@/shared/components/CardDetail.vue';

export default  {
  name: 'Cards',
  components: {IonContent, IonPage },
  data()
  {
    return{
      data : Global.cards,
      modalOpen: false
    }
  },
  ionViewWillEnter()
  {
    // this.data = this.BbyNation(Global.cards);
      // console.log(Filters.nations);
  },
  methods:
  {
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
      const {data} = await modal.onWillDismiss();
      if(data != null)
        setTimeout(() => {
          this.modalOpen = false;
        }, (500));

    },
  },
  filters:
  {
    Filter(value)
    {
      //by nation
      let result = value.filter(e =>
        {
          if(Filters.nations.includes(e.nation))
            return e;
        });
        // console.log(1, result);

      //by name
      result = result.filter(e => 
        {
          if(e.name.toLowerCase().includes(Filters.name.toLowerCase()))
          return e;
        });

        // console.log(2, result);

      //by skill
      result = result.filter(e => 
        {
          if(e.skill.toLowerCase().includes(Filters.skill.toLowerCase()))
          return e;
        });

        // console.log(3, result);

      //by grades
        result = result.filter(e =>
        {
          if(Filters.grades.includes(e.grade))
          return e;
        });
        // console.log(4, result);

      //by power
      result = result.filter(e =>
      {
        if(e.power == Filters.power || Filters.power == '')
          return e;
      });
                // console.log(5, result);

      //by shield
      result = result.filter(e =>
      {
        if(e.shield == Filters.shield || Filters.shield == '')
          return e;
      });
        // console.log(6, result);

      //by Abilities
      result = result.filter(e =>
        {
          if(Filters.abilities.includes(e.ability))
          return e;
        });
        
      // console.log(7, result);

      //by race
      result = result.filter(e => 
        {
          if(e.race.toLowerCase().includes(Filters.race.toLowerCase()))
          return e;
        });
      // console.log(8, result);

      //by sets
      result = result.filter(e =>
        {
          if(e.sets.some(r=> Filters.sets.indexOf(r) >= 0))
          return e;
        });   
        // console.log(9, result);

      //by keywords
      result = result.filter(e =>
        {
          if(e.keywords.some(r=> Filters.keywords.indexOf(r) >= 0))
          return e;
        });
      // console.log(10, result);

      //by Types
        result = result.filter(e =>
        {
          if(Filters.types.includes(e.type))
          return e;
        });
      // console.log(11, result);

      //by triggers
        result = result.filter(e =>
        {
          if(Filters.trigger.includes(e.trigger))
          return e;
        });
      // console.log(12, result);


      return result;
    }
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
</style>