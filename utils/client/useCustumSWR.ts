import { AxiosRequestConfig } from "axios"
import useSWR from "swr"
import customAxios from "../customAxios"

export default function useCustomSWR(url: string, config?: AxiosRequestConfig) {
    const fetcher = (url: string) => customAxios(url, config).then(res => res.data)
    const { data, error } = useSWR(url, fetcher)
    const finaldata = data ? data.result : data
    const normalerror = data?.error
    return {
        data: finaldata,
        isLoading: (error === undefined) && (data === undefined),
        isApiError: normalerror,
        isServerError: error,
        isError: normalerror || error
    }
}