<template>
    <ion-page>
        <ion-content >
            <ion-item class="item">
                <ion-button class="selButton resetAll" @click="ResetAll()"> RESET ALL</ion-button>
            </ion-item>
            <ion-item class="item">
                <ion-input 
                    v-model="nameInput"
                    placeholder="Name" 
                    class="selInput" 
                    @input='onNameSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectNone('name')"> Clear </ion-button>
            </ion-item>
            <ion-item class="item">
                <ion-input 
                v-model="skillInput"
                placeholder="Skill" 
                class="selInput" 
                @input='onSkillSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectNone('skill')"> Clear </ion-button>
            </ion-item>
            <ion-item lines="none">
                <ion-select
                    selected-text="Nations"
                    v-model='nationInput'
                    class="selInput"
                    multiple="true"
                    @ionChange="onNationSelect($event.target.value)"
                    :value="nations">
                    <ion-select-option v-for="n in nations" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('nation')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('nation')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item class="selectValue">
                <span v-if="nationInput.length == 0">None selected</span>
                <span v-else-if="nationInput.length == nations.length">All selected</span>
                <span v-else v-for="n in nationInput" :key="n">{{n}}</span>
            </ion-item>
            <ion-item lines="none">
                <ion-select
                    selected-text="Grades"
                    v-model='gradeInput'
                    class="selInput"
                    multiple="true"
                    @ionChange="onGradeSelect($event.target.value)"
                    :value="grades">
                    <ion-select-option v-for="n in grades" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('grade')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('grade')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item class="selectValue">
                <span v-if="gradeInput.length == 0">None selected</span>
                <span v-else-if="gradeInput.length == grades.length">All selected</span>
                <span v-else v-for="n in gradeInput" :key="n">{{n}}</span>
            </ion-item>
            <ion-item class="item">
                <ion-input 
                v-model="powerInput"
                placeholder="Power" 
                type="number"
                class="selInput" 
                @input='onPowerSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectNone('power')"> Clear </ion-button>
            </ion-item>
            <ion-item class="item">
                <ion-input 
                v-model="shieldInput"
                placeholder="Shield" 
                type="number"
                class="selInput" 
                @input='onShieldSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectNone('shield')"> Clear </ion-button>
            </ion-item>
            <ion-item lines="none">
                <ion-select
                    selected-text="Abilities"
                    v-model='abilityInput'
                    class="selInput"
                    multiple="true"
                    @ionChange="onAbilitySelect($event.target.value)"
                    :value="abilities">
                    <ion-select-option v-for="n in abilities" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('ability')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('ability')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item class="selectValue">
                <span v-if="abilityInput.length == 0">None selected</span>
                <span v-else-if="abilityInput.length == abilities.length">All selected</span>
                <span v-else v-for="n in abilityInput" :key="n">{{n}}</span>
            </ion-item>           
            <ion-item class="item">
                <ion-input 
                v-model="raceInput"
                placeholder="Race" 
                class="selInput" 
                @input='onRaceSelect($event.target.value)'></ion-input>
                <ion-button class="selButton soloButton" @click="SelectNone('race')"> Clear </ion-button>
            </ion-item>
            <ion-item lines="none">
                <ion-select
                    selected-text="Sets"
                    v-model='setInput'
                    class="selInput"
                    multiple="true"
                    @ionChange="onSetSelect($event.target.value)"
                    :value="sets">
                    <ion-select-option v-for="n in sets" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('set')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('set')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item class="selectValue">
                <span v-if="setInput.length == 0">None selected</span>
                <span v-else-if="setInput.length == sets.length">All selected</span>
                <span v-else v-for="n in setInput" :key="n">{{n}}</span>
            </ion-item>     
            <ion-item lines="none">
                <ion-select
                    selected-text="Keywords"
                    v-model='keywordInput'
                    class="selInput"
                    multiple="true"
                    @ionChange="onKeywordSelect($event.target.value)"
                    :value="keywords">
                <ion-select-option v-for="n in keywords" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('keyword')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('keyword')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item class="selectValue">
                <span v-if="keywordInput.length == 0">None selected</span>
                <span v-else-if="keywordInput.length == keywords.length">All selected</span>
                <span v-else v-for="n in keywordInput" :key="n">{{n}}</span>
            </ion-item>   
            <ion-item lines="none">
                <ion-select
                    selected-text="Card Types"
                    v-model='typeInput'
                    class="selInput"
                    multiple="true"
                    @ionChange="onTypeSelect($event.target.value)"
                    :value="types">
                    <ion-select-option v-for="n in types" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('type')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('type')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item class="selectValue">
                <span v-if="typeInput.length == 0">None selected</span>
                <span v-else-if="typeInput.length == types.length">All selected</span>
                <span v-else v-for="n in typeInput" :key="n">{{n}}</span>
            </ion-item>   
            <ion-item lines="none">
                <ion-select
                    selected-text="Triggers"
                    v-model='triggerInput'
                    class="selInput"
                    multiple="true"
                    @ionChange="onTriggerSelect($event.target.value)"
                    :value="triggers">
                    <ion-select-option v-for="n in triggers" :key="n" :value='n'>{{n}}</ion-select-option>
                </ion-select>
                <ion-button class="selButton" @click="SelectAll('trigger')"> SELECT<br>ALL</ion-button>
                <ion-button class="selButton" @click="SelectNone('trigger')"> SELECT<br>NONE</ion-button>
            </ion-item>
            <ion-item class="selectValue">
                <span v-if="triggerInput.length == 0">None selected</span>
                <span v-else-if="triggerInput.length == triggers.length">All selected</span>
                <span v-else v-for="n in triggerInput" :key="n">{{n}}</span>
            </ion-item>   
            <ion-item class="item">
                <ion-button class="selButton resetAll" @click="openCredits()">APP INFO</ion-button>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonSelect, IonItem, IonSelectOption, IonButton, IonInput, modalController } from '@ionic/vue';

import CreditsVue from '@/shared/components/Credits.vue';

import Global from '../../shared/services/Global';
import Filters from '../../shared/services/Filters';


export default  {
    name: 'Filters',
    components: {IonContent, IonPage, IonSelect, IonItem, IonSelectOption, IonButton, IonInput},
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

            nameInput: '',
            skillInput: '',
            raceInput: '',
            powerInput: '',
            shieldInput: '',

            nationInput: Global.nations,
            gradeInput: Global.grades,
            abilityInput: Global.abilities,
            setInput: Global.sets,
            keywordInput: Global.keywords,
            typeInput: Global.types,
            triggerInput: Global.triggers
        }
    },
    ionViewWillEnter()
    {
        // // console.log('holo');
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
            if(value == 'nation' || value== 'default')
            {
                this.nationInput = Global.nations;
            }
            if(value == 'grade' || value== 'default')
            {
                this.gradeInput = Global.grades;
            }
            if(value == 'ability' || value== 'default')
            {
                this.abilityInput = Global.abilities;
            }
            if(value == 'set' || value== 'default')
            {
                this.setInput = Global.sets;
            }
            if(value == 'keyword' || value== 'default')
            {
                this.keywordInput = Global.keywords;
            }
            if(value == 'type' || value== 'default')
            {
                this.typeInput = Global.types;
            }
            if(value == 'trigger' || value== 'default')
            {
                this.triggerInput = Global.triggers;
            }
        },
        SelectNone(value)
        {
            if(value == 'name' || value== 'default')
            {
                this.nameInput = '';
                this.onNameSelect('');
            }
            if(value == 'skill' || value== 'default')
            {
                this.skillInput = '';
                this.onSkillSelect('');
            }
            if(value == 'power' || value== 'default')
            {
                this.powerInput = '';
                this.onPowerSelect('');
            }
            if(value == 'shield' || value== 'default')
            {
                this.shieldInput = '';
                this.onShieldSelect('');
            }
            if(value == 'race' || value== 'default')
            {
                this.raceInput = '';
                this.onRaceSelect('');
            }

            if(value == 'nation' || value== 'default')
            {
                this.nationInput = [];
            }
            if(value == 'grade' || value== 'default')
            {
                this.gradeInput = [];
            }
            if(value == 'ability' || value== 'default')
            {
                this.abilityInput = [];
            }
            if(value == 'set' || value== 'default')
            {
                this.setInput = [];
            }
            if(value == 'keyword' || value== 'default')
            {
                this.keywordInput = [];
            }
            if(value == 'type' || value== 'default')
            {
                this.typeInput = [];
            }
            if(value == 'trigger' || value== 'default')
            {
                this.triggerInput = [];
            }
        },

        ResetAll()
        {
            this.SelectNone('default');
            this.SelectAll('default');
        },
        async openCredits()
        {
            const modal = await modalController
                .create({
                component: CreditsVue,
                cssClass: 'my-custom-class',
                });
            modal.present();
        }
        
    }

}
</script>


<style scoped>

.selectValue
{
    font-size: 11px;
    white-space: pre;

}
.selectValue>span:not(:last-child)::after
{
    content: " | ";
}

.selInput
{
    width: 80vw;
    max-width:  80vw;
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
    width: 132px;
}

ion-input
{
    --color: var(--ion-color-primary);
    --placeholder-color: white;
}

</style>