import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageProvider";

const useLanguage = () => {
    const data = useContext(LanguageContext);
    if (data === null) throw new Error("useLanguage must be used within LanguageProvider!")
    else return data;
}

export default useLanguage;