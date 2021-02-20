<template>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear"  @click="copyText()"> Copy deck to Clipboard (WIP)</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear"  @click="pasteText()"> Import Deck (WIP)</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" @click="deleteDeck()"> Delete Deck</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" @click="cancel()"> Generate Decklist (WIP)</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear"  @click="cancel()"> Generate Proxy Deck (WIP)</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" class="cancel" @click="cancel()"> Close </ion-button>
    </ion-item>
</template>

<script lang='ts'>

import { IonItem, IonButton, modalController } from '@ionic/vue';
import { useRouter } from 'vue-router';


import Global from '@/shared/services/Global';
import Decks from '@/shared/services/Decks';

import Deck from '@/shared/models/Deck';

export default {
    name:'DeckOptions',
    components: { IonItem, IonButton},
    setup() {
      const router = useRouter();
      return { router };
    },
    methods:
    {
        deleteDeck()
        {
            modalController.dismiss({flag:'delete'});
        },
        cancel()
        {
            modalController.dismiss();
        },
        copyText() 
        {
            const el = document.createElement('textarea');  
            el.value = JSON.stringify(Global.currentDeck);                            
            el.setAttribute('readonly', '');                
            el.style.position = 'absolute';                     
            el.style.left = '-9999px';                      
            document.body.appendChild(el);   

            const sel = document.getSelection();
            if(sel!= null)
            {
                const selected =  (document != null && sel.rangeCount) > 0  ? sel.getRangeAt(0) : false;                                    
                el.select();                                    
                document.execCommand('copy');                   
                document.body.removeChild(el);                  
                if (selected) {                                 
                    sel.removeAllRanges();    
                    sel.addRange(selected);   
                }               

                modalController.dismiss();
            }
        },
        pasteText()
        {
            navigator.clipboard.readText()
            .then(text => {
                try
                {
                    const t = JSON.parse(text) as Deck;

                          //createID
                    let currentId = 0;
                    let newId = '';
                    while (newId == '')
                    {
                        if(Decks.find(e => e.id == currentId.toString()))
                        currentId++;
                        else
                        newId = currentId.toString();
                    }

                    t.id = newId;
                    Decks.push(t);
                    localStorage.setItem('decks', JSON.stringify(Decks));

                    modalController.dismiss();
                    this.$router.back();
                }catch(err)
                {
                    console.log(err);
                }
            })
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
        }
    }

}
</script>

<style>
.cancel{
    color:red;
    text-align: center;
    width: 100%;
}


.optionDeckItem
{
    font-size: 15px;
}

.buttons
{
    align-items: center;
}

</style>