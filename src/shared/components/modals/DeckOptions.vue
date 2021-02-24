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
        <ion-button fill="clear"  @click="generateProxyDeck()"> Generate Proxy Deck (WIP)</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" class="cancel" @click="cancel()"> Close </ion-button>
    </ion-item>
</template>

<script>

import { IonItem, IonButton, modalController } from '@ionic/vue';
import { useRouter } from 'vue-router';

import { saveAs } from "file-saver";
import { Document, Media, Packer, Paragraph, TableRow, TableCell, Table, BorderStyle, WidthType } from "docx";

import Global from '@/shared/services/Global';
import Decks from '@/shared/services/Decks';

export default {
    name:'DeckOptions',
    components: { IonItem, IonButton},
    setup() {
      const router = useRouter();
      return { router };
    },
    props:
    {
        deck: null
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
                    const t = JSON.parse(text);

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
        },
        getImageRoute(id)
        {
            const images = require.context('@/assets/cardImages/', false, /\.png$/);
            return images('./'+id+'.png');
        },
        async generateProxyDeck() 
        {

            const doc = new Document();
            let imageArray = [];
            const tablerowArray = [];
            let tableCellArray = [];
            let tablerowIndex = 0;

            for(let index = 0; index<this.deck.decklist.length; index++)
            {
                const cs = this.deck.decklist[index];
                const blob = await fetch(
                this.getImageRoute(cs.cardId)
                ).then(r => r.blob());
                
                for(let i = 0; i<cs.amount; i++)
                {
                    const image = Media.addImage(doc, blob, 211.7, 308.93);
                    imageArray.push(new Paragraph (image));
                    tableCellArray.push(new TableCell ({
                                width: { size: 212, type: WidthType.AUTO }, 
                                columnWidths: [3182.5, 3182.5, 3182.5], 
                                borders: 
                                {
                                    top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                                    bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                                    left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                                    right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                                },
                                children: [new Paragraph(image)],
                            }))
                    tablerowIndex++;
                    console.log('index: ' + tablerowIndex, 'card: ' + cs.cardId);
                    if(tablerowIndex == 3 || (index == this.deck.decklist.length-1 && i==cs.amount-1))
                    {
                        console.log('printRow');
                        tablerowArray.push(new TableRow({
                            children:tableCellArray
                        }));

                        tablerowIndex =0;
                        imageArray = [];
                        tableCellArray = [];
                        console.log(tablerowArray);
                    }
                }
            }

            const table = new Table({
                width: { size: 3182.5, type: WidthType.AUTO }, 
                columnWidths: [3182.5, 3182.5, 3182.5],
                rows: tablerowArray
            });

            console.log(table);

            doc.addSection({
            margins: { top: 0, right: 200, bottom: 0, left: 1000, },
            children: [table]
            });

            Packer.toBlob(doc).then(blob => {
            saveAs(blob, `${this.deck.name}_decklist.docx`);
            console.log("Document created successfully");
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