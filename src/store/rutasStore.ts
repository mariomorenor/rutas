import { defineStore } from "pinia";
import { odooStore } from "./odooStore";
import { ref } from "vue";

interface Driver {
    id: number,
    name: string,
}

interface Bus {
    id: number,
    name: string,
    driver: Driver,

}

interface Stop {
    id: number,
    name: string
}

export interface Route_ {
    id: number,
    name: string,
    buses: Bus[],
    stops: Stop[]
}


export const useRouteStore = defineStore('routesStore', () => {

    const odoo = odooStore();

    const routeSelected = ref<Route_>();

    async function getRoutes(): Promise<Route_[]> {
        try {
            const promise_rutas = odoo.getRecords({ model: 'rutas.rutas' })
            const promise_buses = odoo.getRecords({ model: 'rutas.buses' })
            const promise_ruta_parada = odoo.getRecords({ model: 'rutas.ruta_parada' })
            return Promise.all([promise_rutas, promise_buses, promise_ruta_parada]).then(response => {
                const routes: Route_[] = response[0].result;
                const buses = response[1].result;
                const route_stop = response[2].result;

                routes.forEach((route: any) => {
                    route.buses = route.buses_id.map((bus_id: any) => {
                        const bus = buses.find((b: any) => b.id == bus_id)
                        bus.driver = {
                            id: bus.chofer_id[0],
                            name: bus.chofer_id[1],
                        }
                        return bus
                    });
                    route.stops = route.rutas_paradas.map((parada_id: any) => {
                        const rs = route_stop.find((rs: any) => rs.id == parada_id)
                        if (rs) {
                            return {
                                id: rs.parada_id[0],
                                parada: rs.parada_id[1],
                            }
                        }
                    });

                });

                return routes;
            }).catch((err) => {
                console.log(err);
            })

        } catch (error) {
            console.log(error);
            const r: Route_[] = []
            return r
        }
    }

    function setSelectedRoute(r: any) {
        routeSelected.value = r
    }


    return { getRoutes, routeSelected, setSelectedRoute }
})