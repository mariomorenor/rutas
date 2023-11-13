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
                            <ion-input label="Usuario" label-placement="floating"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input label="Contraseña" label-placement="floating"></ion-input>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonCard, IonCardContent, IonItem, IonImg, IonLabel, IonInput, IonChip, IonList } from '@ionic/vue';
import { } from "ionicons/icons";

import { useMainStore } from "@/store"
const store = useMainStore();

store.getRecords({ model: "banner.usuarios", fields: ["name"] }).then(res => {
    console.log(res);

});

store.deleteRecords({ model: "banner.usuarios", id: 2 })



</script>

<style></style>