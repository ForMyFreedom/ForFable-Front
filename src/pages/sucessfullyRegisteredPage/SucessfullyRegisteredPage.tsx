import { Link } from "react-router-dom";
import { useContext } from 'react'
import { LanguageContext } from "../../contexts/LanguageContext";

export default function SucessfullyRegisteredPage() {
    const [lang] = useContext(LanguageContext);

    return <div style={{paddingTop: '5rem'}}>
        <h1>{lang.SucessfullyRegistered}</h1>
        <h2>{lang.CheckYourEmailToVerifyAccount}</h2>
        <Link to='/'>{lang.ReturnHome}</Link>
    </div>
}