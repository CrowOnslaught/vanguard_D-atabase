<template>
  <ion-app>
      <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import $ from "jquery";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  mounted()
  {
    console.log("aa");
      $.getJSON("https://raw.githubusercontent.com/CrowOnslaught/vanguard_D-atabase/master/src/assets/cardInfo.json", (data) => {
        console.log(data.cards);
      console.log("data");
    }).then( d => 
    {
      console.log("d");
      console.log(d);
    });
      console.log("ddd");
  }
});
</script>

<style>
ion-app
{
  max-width: 1000px;
  margin: auto;
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