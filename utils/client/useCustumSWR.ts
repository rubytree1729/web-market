import { AxiosRequestConfig } from "axios"
import useSWR from "swr"
import customAxios from "../customAxios"

export default function useCustomSWR(url: string, config?: AxiosRequestConfig) {
    const fetcher = (url: string) => customAxios(url, config).then(res => res.data)
    const { data, error } = useSWR(url, fetcher)

    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    }
}