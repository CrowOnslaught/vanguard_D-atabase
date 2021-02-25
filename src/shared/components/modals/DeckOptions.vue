<template>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear"  @click="copyText()"> Copy deck to Clipboard</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear"  @click="pasteText()"> Import Deck</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" @click="deleteDeck()"> Delete Deck</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" @click="generateDecklist()"> Generate Decklist</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear"  @click="generateProxyDeck()"> Generate Proxy Deck</ion-button>
    </ion-item>
    <ion-item class="optionDeckItem">
        <ion-button fill="clear" class="cancel" @click="cancel()"> Close </ion-button>
    </ion-item>
</template>

<script>

import { IonItem, IonButton, modalController } from '@ionic/vue';
import { useRouter } from 'vue-router';

import { saveAs } from 'file-saver';
import { Plugins, FilesystemDirectory } from '@capacitor/core'; 
const { Filesystem } = Plugins;



import { Document, Media, Packer, Paragraph, TableRow, TableCell, Table, BorderStyle, WidthType } from "docx";
import { encodeToBase64, PDFDocument } from 'pdf-lib'

import Global from '@/shared/services/Global';
import Decks from '@/shared/services/Decks';

export default {
    name:'DeckOptions',
    components: { IonItem, IonButton},
    setup() 
    {
        const router = useRouter();
        return { router };
    },
    props:
    {
        deck: null
    },
    mounted()
    {
        const recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', "https://unpkg.com/downloadjs@1.4.7")
        document.head.appendChild(recaptchaScript)
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
                    if(tablerowIndex == 3 || (index == this.deck.decklist.length-1 && i==cs.amount-1))
                    {
                        tablerowArray.push(new TableRow({
                            children:tableCellArray
                        }));

                        tablerowIndex =0;
                        imageArray = [];
                        tableCellArray = [];
                    }
                }
            }

            const table = new Table({
                width: { size: 3182.5, type: WidthType.AUTO }, 
                columnWidths: [3182.5, 3182.5, 3182.5],
                rows: tablerowArray
            });

            doc.addSection({
            margins: { top: 0, right: 200, bottom: 0, left: 1000, },
            children: [table]
            });


            
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const p = require('platform-detect');
            /*if(p.browser)
            {
                console.log('browser!');
                Packer.toBlob(doc).then(blob => 
                {
                    // eslint-disable-next-line no-undef
                    // download(blob, `${this.deck.name}_proxyDeck.docx`, "application/docx");

                    saveAs(blob, `${this.deck.name}_proxyDeck.docx`);

                    window.alert("Document created ");
                })
                .catch(err => 
                {
                    window.alert(err);
                });

            }
            else */if(p.android || p.ios)
            {
                console.log('android!');

                Packer.toBlob(doc).then(blob => 
                {

                    encodeToBase64(blob)
                        .then( docxbase64 =>
                        {
                            Filesystem.writeFile(
                            {
                                path: `${this.deck.name}proxylist.docx`,
                                data: docxbase64,
                                directory: FilesystemDirectory.Documents,
                            }).then(writeFileResponse => 
                                {
                                    console.log('writeFile success => ', writeFileResponse.uri);
                                    
                                    const link = document.createElement("a");
                                    link.download = `${this.deck.name}proxylist.docx`;
                                    link.href = writeFileResponse.uri;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);

                                    window.alert('ProxyList saved in your DOCUMENTS folder');

                                }, error => {
                                    console.log('writeFile error => ', error);
                                });
                        });
                    
                    console.log('Generating proxylist');

      
                });
            }



            modalController.dismiss();

        },
        async generateDecklist()
        {
            const formUrl=('../../../assets/decklist.pdf');

            const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

            const pdfDoc = await PDFDocument.load(formPdfBytes);
            const form = pdfDoc.getForm();

            const formFields = form.getFields()

            //Deck Name & Nation
            form.getTextField('Deck NameRow1').setText(this.deck.name);
            form.getTextField('ClanRow1').setText(this.deck.nation);


            //Test
            form.getFields()[4].setText(form.getFields()[4].getName());

            for (let i = 0; i<this.deck.decklist.length; i++)
            {
                const cs = this.deck.decklist[i];
                const card = Global.cards.find(e => e.id == cs.cardId);

                //Card Name
                const mainDeckCard = "Main deck 50 cardsRow" + (i+1);
                form.getTextField(mainDeckCard).setText(card.name);
                
                //Card Grade
                formFields[16+i].setText(card.grade.toString());

                //Card Amount
                const mainDeckAmount = "Main deck Qty" + (i+1);
                form.getTextField(mainDeckAmount).setText(cs.amount.toString());          
                
                //Card set (Only if there is only one set)
                if(card.sets.length ==1)
                {
                    const mainDeckSet = 'No.'+ ((i+13)>=15? (i+14) : (i+13));
                    form.getTextField(mainDeckSet).setText(card.sets[0]);
                }

                //Card trigger or sentinel
                let triggerOrSentinel ='';
                if(card.type == 'Trigger Unit')
                {
                    triggerOrSentinel += card.trigger; 
                }
                if(card.keywords.includes('Sentinel'))
                {
                    triggerOrSentinel += triggerOrSentinel==''? 'Sentinel' : '/Sentinel';
                }
                const mainDecktrigger = "Main deck Row" + (i+1);
                form.getTextField(mainDecktrigger).setText(triggerOrSentinel);

            }

            const pdfBytes = await pdfDoc.save();
            const pdfBytes64 = await pdfDoc.saveAsBase64();

            modalController.dismiss();

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const p = require('platform-detect');
            if(p.browser)
            {
                console.log('browser!');
                // eslint-disable-next-line no-undef
                download(pdfBytes, `${this.deck.name}_decklist.pdf`, "application/pdf");
            }
            else if(p.android || p.ios)
            {
                console.log('android!');
                            Filesystem.writeFile({
                path: `${this.deck.name}Decklist.pdf`,
                data: pdfBytes64,
                directory: FilesystemDirectory.Documents,
            }).then(writeFileResponse => {
                console.log('writeFile success => ', writeFileResponse.uri);
                
                const link = document.createElement("a");
                link.download = `${this.deck.name}decklist.pdf`;
                link.href = writeFileResponse.uri;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.alert('Decklist saved in your DOCUMENTS folder');

                }, error => {
                    console.log('writeFile error => ', error);
                });
            }

        

        },
        base64ToArrayBuffer(base64) {
            const binaryString = window.atob(base64);
            const binaryLen = binaryString.length;
            const bytes = new Uint8Array(binaryLen);
            for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
            }
            return bytes;
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