import { defineStore } from 'pinia'
import { odooStore } from './odooStore'
import { ref } from 'vue';


interface User {
    id: number,
    display_name: string,
    correo: string,
    imagenQR: string,
}


export const useUserStore = defineStore('userStore', () => {

    const odoo = odooStore();

    const user = ref<User>();

    async function getUserProfile(email: string) {
        try {
            const { result }: { result: any[] | null } = await odoo.getRecords({ model: 'rutas.usuarios', domain: [['correo', '=', email]] });
            if (!result || result.length == 0)
                return false
            user.value = result[0]
            return true
        } catch (error) {
            console.log(error);

            return false;
        }
    }

    return { getUserProfile, user }
})