import { ConstantsServices } from "../../../src/services/ConstantsServices";
import Home from "../../components/home/Home";

export default function HomePage() {
    const constantsService = new ConstantsServices()
    
    return (
        <Home
            constantsService={constantsService}
        />
    );
}
