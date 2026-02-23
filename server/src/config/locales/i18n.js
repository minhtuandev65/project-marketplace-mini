import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import middleware from 'i18next-http-middleware'
import path from 'path'

i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en', // ngôn ngữ mặc định
        preload: ['en', 'vi'], // các ngôn ngữ có sẵn
        backend: {
            loadPath: path.join(
                process.cwd(),
                'src/shared/locales/{{lng}}.json'
            )
        },
        detection: {
            order: ['cookie', 'header'], // ưu tiên cookie, fallback header
            caches: ['cookie'], // lưu lại cookie nếu user chưa có
            lookupCookie: 'i18next' // tên cookie để detect
        },
        debug: false
    })

export default i18next
