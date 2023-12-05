import { useContext } from "react";
import User from "../../components/user/User";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { UserWithToken } from '../../../ForFable-Domain';
import { ReactDuo } from "../../utils/react";

export default function UserPage() {
    const { id } = useParams()

    const requestUserDuo = useContext(UserContext)

    if (!id || isNaN(Number(id))) return null

    return (
        <User
            userDuo={requestUserDuo as ReactDuo<UserWithToken|undefined>}
            searchUserId={Number(id)}
        />
    )
}