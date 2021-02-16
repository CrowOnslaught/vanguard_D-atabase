<template>
    <ion-page>
        <ion-content >
            <ion-item class="item">
                <ion-button class="selButton resetAll" @click="ResetAll()"> RESET ALL</ion-button>
            </ion-item>
            <ion-item class="item">
                <ion-input 
                    placeholder="Name" 
                    class="selInput" 
                    @input='onNameSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectAll('name')"> Clear </ion-button>
            </ion-item>
            <ion-item class="item">
                <ion-input 
                placeholder="Skill" 
                class="selInput" 
                @input='onSkillSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectAll('skill')"> Clear </ion-button>
            </ion-item>
            <ion-item >
                <ion-select
                    selected-text="Nations"
                    class="selInput"
                    multiple="true"
                    @ionChange="onNationSelect($event.target.value)"
                    :value="nations">
                    <ion-select-option v-for="n in nations" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('nation')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('nation')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item >
                <ion-select
                    selected-text="Grades"
                    class="selInput"
                    multiple="true"
                    @ionChange="onGradeSelect($event.target.value)"
                    :value="grades">
                    <ion-select-option v-for="n in grades" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('grades')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('grades')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item class="item">
                <ion-input 
                placeholder="Power" 
                type="number"
                class="selInput" 
                @input='onPowerSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectAll('skill')"> Clear </ion-button>
            </ion-item>
            <ion-item class="item">
                <ion-input 
                placeholder="Shield" 
                type="number"
                class="selInput" 
                @input='onShieldSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectAll('skill')"> Clear </ion-button>
            </ion-item>
            <ion-item >
                <ion-select
                    selected-text="Abilities"
                    class="selInput"
                    multiple="true"
                    @ionChange="onAbilitySelect($event.target.value)"
                    :value="abilities">
                    <ion-select-option v-for="n in abilities" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('abilities')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('abilities')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item class="item">
                <ion-input 
                placeholder="Race" 
                class="selInput" 
                @input='onRaceSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectAll('skill')"> Clear </ion-button>
            </ion-item>
            <ion-item >
                <ion-select
                    selected-text="Sets"
                    class="selInput"
                    multiple="true"
                    @ionChange="onSetSelect($event.target.value)"
                    :value="sets">
                    <ion-select-option v-for="n in sets" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('sets')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('sets')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item >
                <ion-select
                    selected-text="Keywords"
                    class="selInput"
                    multiple="true"
                    @ionChange="onKeywordSelect($event.target.value)"
                    :value="keywords">
                <ion-select-option v-for="n in keywords" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('keywords')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('keywords')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item >
                <ion-select
                    selected-text="Card Types"
                    class="selInput"
                    multiple="true"
                    @ionChange="onTypeSelect($event.target.value)"
                    :value="types">
                    <ion-select-option v-for="n in types" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('types')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('types')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item >
                <ion-select
                    selected-text="Triggers"
                    class="selInput"
                    multiple="true"
                    @ionChange="onTriggerSelect($event.target.value)"
                    :value="triggers">
                    <ion-select-option v-for="n in triggers" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('triggers')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('triggers')"> SELECT<br>NONE</ion-button>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonSelect, IonItem, IonSelectOption } from '@ionic/vue';
import Global from '../../shared/services/Global'
import Filters from '../../shared/services/Filters'

export default  {
    name: 'Filters',
    components: {IonContent, IonPage, IonSelect, IonItem, IonSelectOption },
    data()
    {
        return{
            nations: Global.nations,
            abilities: Global.abilities,
            sets: Global.sets,
            keywords: Global.keywords,
            types: Global.types,
            triggers: Global.triggers,
            grades: Global.grades,
        }
    },
    ionViewWillEnter()
    {
        // console.log('holo');
    },
    methods:
    {
        onNationSelect(value)
        {
            Filters.nations = value;
        },
        onGradeSelect(value)
        {
            Filters.grades = value;
        },
        onNameSelect(value)
        {
            Filters.name = value;
        },
        onSkillSelect(value)
        {
            Filters.skill = value;
        },
        onPowerSelect(value)
        {
            Filters.power = value;
        },
        onShieldSelect(value)
        {
            Filters.shield = value;
        },
        onAbilitySelect(value)
        {
            Filters.abilities = value;
        },
        onRaceSelect(value)
        {
            Filters.race = value;
        },
        onSetSelect(value)
        {
            Filters.sets = value;
        },
        onKeywordSelect(value)
        {
            Filters.keywords = value;
        },
        onTypeSelect(value)
        {
            Filters.types = value;
        },
        onTriggerSelect(value)
        {
            Filters.trigger =value;
        },

        SelectAll(value)
        {
            console.log(value);
        },
        SelectNone(value)
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

.resetAll
{
    width: 100%;
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