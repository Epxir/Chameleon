import { createI18n } from 'vue-i18n'
import zh from '../i18n/zh'
import en from '../i18n/en'

const i18n = createI18n({
   globalInjection: true,
   locale: localStorage.getItem('locale') || navigator.language.slice(0, 2),
   messages:{
      zh,
      en
   }
});
export default i18n;