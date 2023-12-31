import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import axios from 'axios';
import en from './translations/en';
import it from './translations/it';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
};

export const getCurrentLanguage = () => (i18n.language || window.localStorage.i18nextLng || 'en').substr(0, 2);

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    lookupQuerystring: 'lang',
    debug: true,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .then(() => {
    axios.defaults.params = {};
    axios.defaults.params.language = getCurrentLanguage();
    console.log('i18n init complete');
  });

export default i18n;
