import UsersList from "../../components/users-list/UsersList";
import { UserServices } from "../../services/UserServices";

export default function UsersListPage() {
    const services = new UserServices()
    return <UsersList
        userService={services}
    />
}