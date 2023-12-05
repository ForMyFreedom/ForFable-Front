import { useContext } from "react";
import User from "../../components/user/User";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { UserEntity } from '../../../ForFable-Domain';
import { ReactDuo } from "../../utils/react";

export default function UserPage() {
    const { id } = useParams()

    const requestUserDuo = useContext(UserContext)

    if (!id || isNaN(Number(id))) return null

    return (
        <User
            requestUserDuo={requestUserDuo as ReactDuo<UserEntity|null>}
            searchUserId={Number(id)}
        />
    )
}