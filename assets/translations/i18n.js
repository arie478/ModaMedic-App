import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import he from './he.json';
import ru from './ru.json';
import ar from './ar.json';
import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * Initializes the i18n library with the given options and exports the i18n instance.
 * @param {Object} options - The options to use for initialization.
 * @param {string} options.compatibilityJSON - The compatibility mode to use.
 * @param {string} options.lng - The initial language to use.
 * @param {string} options.fallbackLng - The fallback language to use.
 * @param {Object} options.resources - The translation resources to use.
 * @param {Object} options.interpolation - The interpolation options to use.
 * @param {boolean} options.interpolation.escapeValue - Whether to escape values for safe rendering.
 */
/*
This code initializes the i18n library using the init function and the given options.
It then exports the i18n instance.
The options include the compatibility mode, the initial language, the fallback language,
the translation resources, and the interpolation options.
 */
i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: en,
        he: he,
        ru: ru,
        ar: ar,
    },
    interpolation: {
        escapeValue: false // react already safes from xss
    }



});

export default i18n;