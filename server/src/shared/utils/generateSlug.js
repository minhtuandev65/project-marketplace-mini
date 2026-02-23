import slugify from 'slugify'

/**
 * Tạo slug base từ title
 */
const createBaseSlug = (title) => {
    return slugify(title, {
        lower: true,
        strict: true,
        locale: 'vi',
        trim: true
    })
}

/**
 * Tạo slug duy nhất (nếu trùng thì tăng -1, -2, ...)
 */
export const generateUniqueSlug = async (title, repository, field = 'slug') => {
    const baseSlug = createBaseSlug(title)
    let slug = baseSlug
    let index = 1

    // check trùng
    while (await repository.findBySlug(slug)) {
        slug = `${baseSlug}-${index}`
        index++
    }

    return slug
}
