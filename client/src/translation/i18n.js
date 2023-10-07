import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import en from '../i18n/en.json'
import vi from '../i18n/vi.json'

i18next
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
            },
            vi: {
                translation: vi,
            },
        },
        lng: 'vi',
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false,
        },
    })

export default i18next
