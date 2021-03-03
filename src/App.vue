<template>
  <ion-app>
      <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

import { Plugins } from '@capacitor/core';
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
  mounted()
  {
    AdMob.initialize();
    // this.checkCardsVersion();
  },
  // methods:
  // {
  //   async checkCardsVersion()
  //   {
  //     await $.getJSON("https://raw.githubusercontent.com/CrowOnslaught/vanguard_D-atabase/master/src/assets/cardInfo.json")
  //     .then(data => 
  //     {
  //       console.log(data.version);
  //       const cloudVersion = data.version.split('.');
  //       const localVersion = Global.cardsVersion.split('.');
  //       if(this.checkVersionHigher(cloudVersion, localVersion))
  //       {
  //         // const json = JSON.stringify(data);

  //       } 
      
  //     }).catch(err =>
  //     {
  //       console.log(err);
  //     });
  //   },
  //   checkVersionHigher(a: string[],b: string[])
  //   {
  //     if(a[0] > b[0])
  //       return true;
  //     else if(a[0] < b[0])
  //       return false;
  //     else
  //     {
  //       if(a[1] > b[1])
  //         return true;
  //       else if(a[1] < b[1])
  //         return false;
  //       else
  //       {
  //         if(a[2] > b[2])
  //           return true;
  //         else if(a[2] < b[2])
  //           return false;
  //         else
  //         {
  //           if(a[3] > b[3])
  //             return true;
  //           else if(a[3] < b[3])
  //             return false;
  //           else
  //           {
  //             return false;
  //           }
  //         }
  //       }
  //     }
  //   }
  // },
  
});
</script>

<style>
ion-app
{
  max-width: 1000px;
  margin: auto;
  margin-top: 50px;
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

</style>