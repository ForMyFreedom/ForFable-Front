import Login from "../../components/login/Login"
import { LoginServices } from "../../services/LoginServices";

export default function LoginPage() {
    const loginService = new LoginServices()

    return (
        <Login loginService={loginService}/>
    );
}
