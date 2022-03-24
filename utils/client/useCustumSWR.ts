import { AxiosRequestConfig } from "axios"
import useSWR from "swr"
import customAxios from "../customAxios"

export default function useCustomSWR(url: string, config?: AxiosRequestConfig) {
    const fetcher = (url: string) => customAxios(url, config).then(res => res.data)
    let { data, error } = useSWR(url, fetcher)
    if (data.error) {
        error = data.error
    }
    return {
        data: data.result,
        isLoading: !error && !data,
        isError: error
    }
}