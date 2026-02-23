export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
export const OBJECT_ID_RULE_MESSAGE =
    'Your string fails to match the Object Id pattern!'
export const FIELD_REQUIRED_MESSAGE = 'schema.users.failed.required'
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'schema.users.email.invalid'
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE = 'schema.users.password.invalid'
export const NAME_RULE = /^[\p{L}\s]+$/u
export const NAME_RULE_MESSAGE = 'schema.users.username.invalid'

// Liên quan đến Validate File
export const LIMIT_COMMON_FILE_SIZE = 10485760 // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
export const PHONE_RULE = /^[0-9]{10,15}$/

/* Sử dụng cho schema web */
export const SLUG_RULE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const SLUG_RULE_MESSAGE = 'schema.projects.slug.invalid'

export const URL_RULE =
    /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
export const URL_RULE_MESSAGE = 'schema.projects.url.invalid'
