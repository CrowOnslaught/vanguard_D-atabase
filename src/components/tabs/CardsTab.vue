<template>
  <ion-page>
    <ion-content >
      <ion-grid>
        <ion-row>
          <ion-col v-for="c in $options.filters.Filter(data)" :key="c.id" size="6">
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
    }
  },
  ionViewWillEnter()
  {
    // this.data = this.BbyNation(Global.cards);
      console.log(Filters.nations);
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
        console.log(1, result);

      //by name
      result = result.filter(e => 
        {
          if(e.name.toLowerCase().includes(Filters.name.toLowerCase()))
          return e;
        });

        console.log(2, result);

      //by skill
      result = result.filter(e => 
        {
          if(e.skill.toLowerCase().includes(Filters.skill.toLowerCase()))
          return e;
        });

        console.log(3, result);

      //by grades
        result = result.filter(e =>
        {
          if(Filters.grades.includes(e.grade))
          return e;
        });
        console.log(4, result);

      //by power
      result = result.filter(e =>
      {
        if(e.power == Filters.power || Filters.power == '')
          return e;
      });
                console.log(5, result);

      //by shield
      result = result.filter(e =>
      {
        if(e.shield == Filters.shield || Filters.shield == '')
          return e;
      });
        console.log(6, result);

      //by Abilities
      result = result.filter(e =>
        {
          if(Filters.abilities.includes(e.ability))
          return e;
        });
        
      console.log(7, result);

      return result;
    }
  }
}
</script>