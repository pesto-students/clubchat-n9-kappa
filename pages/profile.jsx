import ProfileComponent from '../ui/components/ProfileComponent/ProfileComponent';
import { useUser } from "../lib/hooks";
import Loader from 'react-loader';
import { useRouter } from "next/router";

export default function profile() {
    const router = useRouter();
    const { finished, hasUser = false, user, error } = useUser();
    if (finished) {
        if (!hasUser && !user) {
            router.push('/login');
        }
    }
    return (<>
        {finished ? <ProfileComponent /> : <Loader />}
    </>)
}
