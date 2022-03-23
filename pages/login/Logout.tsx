import { useRouter } from "next/router";
import axios from "axios";

export default function Logout() {
    const router = useRouter();

    const logoutFunction = () => {
        axios.get("", {

        }).then(() => {
            router.replace("/login")
        })
    }

    return (
        <>
            <button onClick={logoutFunction}></button>
        </>
    )
}