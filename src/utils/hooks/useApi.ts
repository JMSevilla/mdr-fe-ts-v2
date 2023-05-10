import { Api } from "@/pages/api/api";
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { MdrApi } from "@/pages/api/mdr/api";
import Http, { HttpOptions } from "@/pages/api/http-client";
import { config } from "../config";
import { AxiosInstance, AxiosError } from "axios";
import { UsersApi } from "@/pages/api/users/api";
import { AuthenticationApi } from "@/pages/api/Authentication/api";

import { getItem } from "../session-storage";


const HTTP_OPTIONS: HttpOptions = {
    headers: {
        "Content-Type" : "application/json",
        "x-api-key" : config.value.AUTH_TOKEN
    },
    onRequest: (req: any) => {
        const accessToken = getItem<string | undefined>('AT')
        if(req.headers && accessToken) req.headers.Authorization = `Bearer ${accessToken}`
    }
}



export const httpClient = new Http({ ...HTTP_OPTIONS, baseURL : config.value.TENANT_URL })
export const httpSsrClient = new Http({
    ...HTTP_OPTIONS,
    baseURL: config.value.TENANT_URL
})
export const useApiCallBack = <R, A extends unknown>(asyncFn: (api: Api, args: A) => Promise<R>) =>
    
useAsyncCallback(async (args?: A) => {
        try {
            return await asyncFn(createApi(httpClient.client), args as A);
        } catch (e: any) {
            throw e
        }
    })

function createApi(client: AxiosInstance){
    return new Api(
        new AuthenticationApi(client),
        new MdrApi(client),
        new UsersApi(client)
    )
}

function handleError(e: any) {
   console.log(e)
   const rawErrors = e.response.data?.errors
   return Array.isArray(rawErrors) ? rawErrors.map(e => e.code ?? 'Something went wrong') : ['Something went wrong']
}