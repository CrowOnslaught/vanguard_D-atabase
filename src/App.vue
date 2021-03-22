<template>
  <ion-app>
      <ion-spinner id="spinner" v-if="!loaded"></ion-spinner>
      <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

import { Plugins } from '@capacitor/core';
import Global from './shared/services/Global';
const { AdMob } = Plugins;

// import $ from "jquery";
// import Global from './shared/services/Global';
// import fs from 'fs';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  data()
  {
    return{
      loaded: false
    }
  },
  mounted()
  {
    this.checkCardsVersion();
    AdMob.initialize();
  },
  methods:
  {
    async checkCardsVersion()
    {
      
      await fetch("https://raw.githubusercontent.com/CrowOnslaught/vanguard_D-atabase/master/src/assets/cardInfo.json")
      .then(res => res.json())
      .then(data => 
      {
        const cloudVersion = data.version.split('.');
        const localVersion = Global.cardsVersion.split('.');
        if(this.checkVersionHigher(cloudVersion, localVersion))
        {
          console.log(data);
          Global.cards = data.cards;
          Global.nations = data.nations;
          Global.races = data.races;
          Global.abilities = data.abilities;
          Global.types = data.types;
          Global.triggers = data.triggers;
          Global.keywords = data.keywords;
          Global.sets = data.sets;
        } 
      
        this.$router.push('/tabs/cards');
        this.loaded = true;
      }).catch(err =>
      {
        window.alert('Check internet conection');
        this.$router.push('/tabs/cards');
        console.log('_____________________________',err);
      });
    },
    checkVersionHigher(a: string[],b: string[])
    {
      if(a[0] > b[0])
        return true;
      else if(a[0] < b[0])
        return false;
      else
      {
        if(a[1] > b[1])
          return true;
        else if(a[1] < b[1])
          return false;
        else
        {
          if(a[2] > b[2])
            return true;
          else if(a[2] < b[2])
            return false;
          else
          {
            if(a[3] > b[3])
              return true;
            else if(a[3] < b[3])
              return false;
            else
            {
              return false;
            }
          }
        }
      }
    }
  },
  
});
</script>

<style>
ion-app
{
  max-width: 1000px;
  margin: auto;
  margin-top: 50px;
}

#spinner
{
  position: absolute;
  top: 45%;
  left: 45%;
}

ion-content{

    --background: black url('../resources/splash.png') no-repeat center center /cover;
}

.small-modal-newDeck .modal-wrapper
{

  height: 250px;
  width: 80%;

  --border-radius: 16px;
  --border-color: var(--ion-color-primary-shade);
  --border-width: 3px;
  --border-style: solid;

}
.small-modal-optionDeck .modal-wrapper
{

  height: 270px;
  width: 80%;

  --border-radius: 16px;
  --border-color: var(--ion-color-primary-shade);
  --border-width: 3px;
  --border-style: solid;
}
.small-modal-addToDeck .modal-wrapper
{

  height: 226px;
  width: 80%;

  --border-radius: 16px;
  --border-color: var(--ion-color-primary-shade);
  --border-width: 3px;
  --border-style: solid;
}

.small-modal-delete>.alert-wrapper
{
  border-radius: 16px;
  border: var(--ion-color-primary-shade) 3px solid;

  --background: black;
}

.card-detail-modal>.modal-wrapper
{
  width: 100%;
  height: 100%;
}

</style>