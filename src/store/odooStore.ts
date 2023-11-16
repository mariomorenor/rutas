import { CapacitorHttp, HttpOptions } from '@capacitor/core'
import { getPlatforms } from '@ionic/vue'
import { defineStore } from 'pinia'

export const odooStore = defineStore('odooStore', () => {
    const isNative = getPlatforms().includes('desktop')
    console.log(getPlatforms());

    // *** Connection Parameters ***
    const Server = isNative ? "https://unitec.pucesd.edu.ec/jsonrpc/" : '/api/jsonrpc'; //Environment
    const user_id = isNative ? 751 : 747;
    const db_name = "pucesd";
    const api_key = "bot_rutas" // or password

    async function Http({ model, action, data }: { model: string, action: "create" | "search" | "write" | "unlink" | "search_read", data: any }) {

        const options: HttpOptions = {
            url: Server,
            headers: { "Content-Type": "application/json" },
            data: {
                method: "call",
                params: {
                    service: "object",
                    method: "execute",
                    args: [db_name, user_id, api_key, model, action, ...data]
                }
            },
        }

        const res = await CapacitorHttp.post(options);
        return res.data;
    }

    async function getRecords({ model, domain, fields, offset, limit }: { model: string, domain?: any, fields?: string[], offset?: number, limit?: number }) {

        const res = await Http({ model, action: "search_read", data: [domain, fields, offset, limit] })

        return res;
    }


    async function getRecordById({ model, id }: { model: string, id: number }) {

        const res = await Http({ model, action: "search_read", data: [id] })

        return res.data;
    }

    async function deleteRecords({ model, id }: { model: string, id: number }) {
        const res = await Http({ model, action: "unlink", data: [id] });

        return res.data;
    }


    return { getRecords, deleteRecords, getRecordById }
})