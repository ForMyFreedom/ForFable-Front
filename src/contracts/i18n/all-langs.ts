import { LanguageContract } from "./contract";
import { en } from "./en";
import { ptBR } from "./pt-BR";

export const ALL_LANGUAGES: LanguageContract[] = [en, ptBR]

export const ALL_LANGUAGES_BY_CODE: { [key: string]: LanguageContract } =
 ALL_LANGUAGES.map(lang => ({ [lang.LANGUAGE_CODE]: lang })).reduce((prev, curr) => ({ ...prev, ...curr }), {})