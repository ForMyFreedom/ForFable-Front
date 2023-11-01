import { useContext } from "react";
import User from "../../components/user/User";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { UserWithToken } from "../../for-fable-domain";
import { ReactDuo } from "../../utils/react";
import { UserServices } from "../../services/UserServices";

export default function UserPage() {
    const { id } = useParams()

    const requestUserDuo = useContext(UserContext)

    const userService = new UserServices()

    if (!id || isNaN(Number(id))) return null

    return (
        <User
            userDuo={requestUserDuo as ReactDuo<UserWithToken|undefined>}
            searchUserId={Number(id)}
            userService={userService}
        />
    )
}