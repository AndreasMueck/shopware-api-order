import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;
//console.log('baseUrl: ' + baseUrl);

export const useAuthStore = defineStore('auth',{ // Option store anstatt Setup Stores
    //id: 'auth',
    //You can think of state as the data of the store, getters as the computed properties of the store, and actions as the methods.
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    getters: {
        showState: (state) => state,
      },
    actions: {
        async login(username, password) {
            try {
                const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password }); // weitere Verarbeitung   

                // Rückgabewert in 'user' wenn gültiger user Datensatz gefunden wurde
                // console.log('User: ' + JSON.stringify(user));
                // user = {"id":1,"username":"mustermann","firstName":"Max","lastName":"Mustermann","token":"fake-jwt-token"}

                // update pinia state
                this.user = user;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/account/login');
        }
    }
});
