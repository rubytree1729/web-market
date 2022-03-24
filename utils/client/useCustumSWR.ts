import { AxiosRequestConfig } from "axios"
import useSWR from "swr"
import customAxios from "../customAxios"

export default function useCustomSWR(url: string, config?: AxiosRequestConfig) {
    const fetcher = (url: string) => customAxios(url, config).then(res => res.data)
    const { data, error } = useSWR(url, fetcher)
    const finaldata = data ? data.result : data
    const finalerror = (data && data.error) ? data.error : error
    return {
        data: finaldata,
        isLoading: (error === undefined) && (data === undefined),
        isError: finalerror
    }
}