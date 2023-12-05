import { createContext, useState, useEffect } from "react";
import { ReactDuo } from "../utils/react";
import { LanguageContract } from "../contracts/i18n/contract";
import { en } from "../contracts/i18n/en";
import { ALL_LANGUAGES_BY_CODE } from "../contracts/i18n/all-langs";

interface Props {
  children: React.ReactNode;
}

const LanguageContext = createContext<ReactDuo<LanguageContract>>([en, () => {}]);

const LanguageProvider: React.FC<Props> = ({ children }) => {
    const selectedLanguage = localStorage.getItem('language')
    const duo = useState<LanguageContract>(ALL_LANGUAGES_BY_CODE[selectedLanguage||''] ?? en);

    const [lang] = duo

    useEffect(()=>{
        localStorage.setItem('language', lang.LANGUAGE_CODE)
    }, [lang])
  
    return (
      <LanguageContext.Provider value={duo}>
        {children}
      </LanguageContext.Provider>
    );
}
  
export { LanguageContext, LanguageProvider };