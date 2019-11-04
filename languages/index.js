import i18n from 'i18n-js'

import es from './es'

// Por defecto se usa el idioma español
i18n.defaultLocale = 'es'
// Se elige el idioma a usar. A futuro esto se setea en settings
i18n.locale = 'es'

// Si no está el string apropiado, usa el string en español por defecto
i18n.fallbacks = true
// Aqui se incluyen los distintos objetos con los strings
i18n.translations = { es }

const getString = (key, params) => i18n.t(key, params)
export default getString
