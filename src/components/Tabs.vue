<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div id='toolbar'>
          <img id='logo' src="../assets/VGD_logo.png"/>
          <ion-title>Vanguard [D]atabase</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button tab="tab1" href="/tabs/cards">
          <ion-icon :icon="reader" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/decks">
          <ion-icon :icon="layers" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/filters">
          <ion-icon :icon="cog" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { layers, cog, reader } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      layers, 
      cog, 
      reader,
    }
  }
}
</script>

<style>

#toolbar
{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

#logo
{
  padding-top: 4px;
  padding-left: 4px;
  height: 40px;
  width: auto;

}
</style>