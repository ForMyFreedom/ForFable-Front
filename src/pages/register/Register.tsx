import Register from "../../components/register/Register"
import { LoginServices } from "../../services/LoginServices"
import { UserServices } from "../../services/UserServices"


export default function RegisterPage() {
    const userService = new UserServices()
    const loginService = new LoginServices()
    return (
        <Register userService={userService} loginService={loginService}/>
    )
}