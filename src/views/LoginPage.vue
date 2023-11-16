<template>
    <ion-page>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-img src="img/pucesdlogo.png"></ion-img>
                    <ion-list>
                        <ion-item class="ion-text-center" lines="none">
                            <ion-label color="primary">Iniciar Sesión</ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-input v-model="email" label="Usuario" label-placement="floating"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Contraseña" label-placement="floating"></ion-input>
                        </ion-item>
                        <br>
                        <ion-button @click="login()" expand="full">Login</ion-button>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonCard, IonCardContent, IonItem, IonImg, IonLabel, IonInput, IonChip, IonList, IonButton } from '@ionic/vue';
import { } from "ionicons/icons";
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();

const email = ref('')

function login() {
    userStore.getUserProfile(email.value).then((res) => {

        if (res) {
            router.replace({ name: 'Routes' })
        }
    });
}

</script>

<style></style>