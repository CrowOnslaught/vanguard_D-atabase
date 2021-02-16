<template>
    <ion-page>
        <ion-content >
            <ion-item class="item">
                <ion-input class="selInput" placeholder="NAME" @input='onNameSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectAll('name')"> Clear </ion-button>
            </ion-item>
            <ion-item class="item">
                <ion-input class="selInput" placeholder="SKILL" @input='onSkillSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectAll('skill')"> Clear </ion-button>
            </ion-item>
            <ion-item >
                <ion-select
                    class="selInput"
                    multiple="true"
                    selected-text="Nations"
                    @ionChange="onNationSelect($event.target.value)"
                    :value="info">
                    <ion-select-option v-for="n in info" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('nation')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('nation')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item >
                <ion-select
                    class="selInput"
                    multiple="true"
                    selected-text="Grades"
                    @ionChange="onGradeSelect($event.target.value)"
                    :value="gradeSelected">
                    <ion-select-option v-for="n in [0, 1, 2, 3, 4]" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('nation')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('nation')"> SELECT<br>NONE</ion-button>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonSelect, IonItem, IonSelectOption } from '@ionic/vue';
import Global from '../../shared/services/Global'

export default  {
    name: 'Filters',
    components: {IonContent, IonPage, IonSelect, IonItem, IonSelectOption },
    data()
    {
        return{
            info: Global.nations,
            nationSelected: Global.nations,
            gradeSelected: [0, 1, 2, 3, 4]
        }
    },
    ionViewWillEnter()
    {
        console.log('holo');
    },
    methods:
    {
        onNationSelect(value)
        {
            this.nationSelected = value;
            console.log(this.nationSelected );
        },
        onGradeSelect(value)
        {
            console.log(value);
        },
        SelectAll(value)
        {
            console.log(value);
        },
        SelectNone(value)
        {
            console.log(value);
        },
        onNameSelect(value)
        {
            console.log(value);
        },
        onSkillSelect(value)
        {
            console.log(value);
        }
        
    }

}
</script>

<style scoped>

.item
{
}

.selInput
{
    width: 200px;
}

.selButton
{
    height: 40px;
    margin: 10px 0px 10px 10px;
}

.soloButton
{
    width: 140px;
}

</style>