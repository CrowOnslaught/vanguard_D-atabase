<template>
  <ion-app>
      <ion-spinner id="spinner"></ion-spinner>
      <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/vue';
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
    IonSpinner
  },
  mounted()
  {
    AdMob.initialize();
    this.$router.push('/tabs/cards');
  }
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