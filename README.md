## Vue3 wizard
#### Simple wizard with vertical and horizontal orientation

## Dependencies

-   required: Vuejs >= 3.x

## Installation

```bash
npm install vue3-wizard --save
```

```bash
yarn add vue3-wizard
```

![image](https://github.com/6y6jlb/vue3-wizard/assets/76783827/0e32b424-eb06-4c80-b334-3e852b4e8920)

![image](https://github.com/6y6jlb/vue3-wizard/assets/76783827/442b3675-de86-4cce-8dc3-db38fccde63d)




## Simple example

```bash

## form-with-wizard.vue

<script setup>
import { ref } from "vue";

const steps = [
    "1 step: name",
    "2 step: age",
    "3 step: should i make horizontal wizard?",
    "4 step: result",
];

const step = ref(1);
const formData = ref({ name: "", age: 18, question: "yes" });
</script>

<template>
    <div>
        <div>
            <div>
                <div>step: {{ step }}</div>
                <vue-wizard :steps="steps" :step="step" class="wrapper" />
            </div>
            <div>
                <div v-if="step === 1">
                    <p>What is your name?</p>
                    <input type="text" v-model="formData.name" />
                </div>
                <div v-if="step === 2">
                    <p>What is your age?</p>
                    <input type="number" v-model="formData.age" />
                </div>
                <div v-if="step === 3">
                    <p>Shoul i make horizontal wizard?</p>
                    <input
                        type="radio"
                        v-model="formData.question"
                        value="yes"
                    />
                    <input
                        type="radio"
                        v-model="formData.question"
                        value="no"
                    />
                </div>
                <div v-if="step === 4">
                    <p>RESULT</p>
                    <code> {{ formData }} </code>
                </div>
            </div>
            <div class="actions">
                <button @click="step--">back</button>
                <button @click="step++">next</button>
            </div>
        </div>
    </div>
</template>

<style>
</style>

```

## Styles

-   It is possible to redefine constants using the following variables in the "vue-wizard-class"

```bash
.vue-wizard-wrapper {
    --wizard-redifined-step-width: 10rem
    --wizard-redifined-step-size: 2rem;
    --wizard-redifined-disabled-color: red;
    --wizard-redifined-primary-color: green;
    --wizard-redifined-step-bg-color: yellow;
    --wizard-redifined-point-outer-size: calc(var(--wizard-redifined-step-size) * 1.6);
    --wizard-redifined-nested-point-size: calc(var(--wizard-redifined-step-size) * 0.3);
    --wizard-redifined-line-width: 1rem;
    --wizard-redifined-line-offset: calc(var(--wizard-redifined-line-width) / 2 + var(--wizard-outer-point-width) / 2);
    --wizard-redifined-border-width: 8px;
    --wizard-redifined-gap: 2rem;
}
```
