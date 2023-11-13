import { CapacitorHttp, HttpOptions } from '@capacitor/core'
import { getPlatforms } from '@ionic/vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
    const isNative = !getPlatforms().includes('desktop')

    // *** Connection Parameters ***
    const Server = !isNative ? "https://unitec.pucesd.edu.ec/jsonrpc/" : 'api/jsonrpc'; //Environment
    const user_id = 741;
    const db_name = "pucesd";
    const api_key = "9d9a9b1bec83440861f6f70b2064b6a16425a559"

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
        console.log(res.data);

        return res.data;
    }


    async function getRecords({ model, domain, fields, offset, limit }: { model: string, domain?: any, fields?: string[], offset?: number, limit?: number }) {

        const res = await Http({ model, action: "search_read", data: [domain, fields, offset, limit] })

        return res.data;
    }

    async function deleteRecords({ model, id }: { model: string, id: number }) {
        const res = await Http({ model, action: "unlink", data: [id] });

        return res.data;
    }


    return { getRecords , deleteRecords}
})