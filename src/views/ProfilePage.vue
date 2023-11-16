<template>
    <ion-page>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-img class="img-profile" src="img/user-profile.svg"></ion-img>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item>
                            <ion-label>
                                <p>Nombre</p>
                                <h2 v-text="userStore.user?.display_name"></h2>
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                <p>Email</p>
                                <h2 v-text="userStore.user?.correo"></h2>
                            </ion-label>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-button @click="identityModal = true">Ver Identidad</ion-button>
                            <ion-modal :is-open="identityModal">
                                <ion-header>
                                    <ion-toolbar color="primary">
                                        <ion-title>Identidad</ion-title>
                                        <ion-buttons slot="start">
                                            <ion-button @click="identityModal = false">
                                                <ion-icon :icon="arrowBack"></ion-icon>
                                            </ion-button>
                                        </ion-buttons>
                                    </ion-toolbar>
                                </ion-header>
                                <ion-content>
                                    <div>
                                        <ion-img :src='`data:image/png;base64,${userStore.user?.imagenQR}`'></ion-img>
                                    </div>
                                </ion-content>
                            </ion-modal>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import {
    IonPage, IonContent, IonCard, IonCardHeader, IonCardContent,
    IonImg, IonList, IonItem, IonLabel, IonModal,
    IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
const identityModal = ref(false);
const userStore = useUserStore();

</script>

<style lang="scss">
.img-profile {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}
</style>