<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

// Action bei fehlerhafter Eingabe
const schema = Yup.object().shape({
    username: Yup.string().required('Benutzername eingeben'),
    password: Yup.string().required('Passwort eingeben')
});

// Authentifizierung nach Eingabe der Daten
async function onSubmit(values) { // (values) aus der Eingabe
    const authStore = useAuthStore();
    const { username, password } = values; // values als Parameter aus der Eingabe - auch die Falscheingaben
    //console.log('Eingabefelder: ' + JSON.stringify(values));
    await authStore.login(username, password); // Übergabe der Eingaben an Login Methode
}
</script>

<template>
    <div class="card m-3">
        <h4 class="card-header">Anmelden mit Shopware-Benutzer</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Benutzername</label>
                    <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="form-group">
                    <label>Passwort</label>
                    <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Login
                    </button>
                    <router-link to="register" class="btn btn-link">Register</router-link>
                </div>
            </Form>
        </div>
    </div>
</template>
