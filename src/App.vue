<script setup>
import { Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}

const isButtonDisabled = true;
const id = 11;
const number = 1;
const newDate = new Date();

const attributeName = 'href';

</script>

<template>
    <div class="app-container" :class="authStore.user && 'bg-light'">
        <Nav />
        <Alert />
        <div class="container pt-4 pb-4">
            <router-view />
            <div v-bind="objectOfAttrs">DYNAMIC BIND</div>
            <button :disabled="isButtonDisabled">Button</button>
            <button>Button</button>
            <div :id="`list-${id}`">XXX</div>
            <div :class="`${number + id + 3}`">XXX</div>
            <div>{{ newDate }} X</div>
            <a v-bind:[attributeName]="url"> ... </a>
        </div>
        
    </div>
</template>

<style>
@import '@/assets/base.css';
</style>