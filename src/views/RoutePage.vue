<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title v-text="route?.name"></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { useRouteStore } from '@/store/rutasStore';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonLabel, IonBackButton, IonButtons } from '@ionic/vue';
const routesStore = useRouteStore();

const route = routesStore.routeSelected;


</script>