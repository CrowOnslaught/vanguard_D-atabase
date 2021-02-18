<template>
  <ion-app>
      <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  }
});
</script>

<style>
ion-app
{
  max-width: 1000px;
  margin: auto;
}

.small-modal .modal-wrapper
{

  height: 250px;
  width: 80%;

  --border-radius: 16px;
  --border-color: var(--ion-color-primary-shade);
  --border-width: 3px;
  --border-style: solid;

}

</style>