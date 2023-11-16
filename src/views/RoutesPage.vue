<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Rutas Disponibles</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list lines="full" v-for="route in routes">
                <ion-item @click="routeDetails(route)" :detail="true">
                    <ion-label v-text="route.name"></ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonItemGroup, IonItemDivider, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRouteStore, Route_ } from '@/store/rutasStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const routesStore = useRouteStore();

const routes = ref<Route_[]>();


routesStore.getRoutes().then((resp) => {
    routes.value = resp
});

function routeDetails(route: any) {
    console.log(route);

    routesStore.setSelectedRoute(route)

    router.push({
        name: 'Route',
    })
}



</script>

<style>
.space {
    display: block;
    width: 100%;
}
</style>