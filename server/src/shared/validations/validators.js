// rule cho id
export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
export const OBJECT_ID_RULE_MESSAGE = 'schema.users.id.invalid'
export const FIELD_REQUIRED_MESSAGE = 'schema.users.failed.required'

// rule cho email
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'schema.users.email.invalid'

// rule cho password
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE = 'schema.users.password.invalid'

// rule cho tên
export const NAME_RULE = /^[\p{L}\s]+$/u
export const NAME_RULE_MESSAGE = 'schema.users.username.invalid'

// rule cho mã số thuế
export const TAX_CODE_RULE = /^[0-9]{10,13}$/
export const TAX_CODE_RULE_MESSAGE =
    'schema.sellers.business_identity.tax_code.invalid'

// rule cho mã định danh cá nhân
export const ID_NUMBER_RULE = /^[0-9]{9,12}$/
export const ID_NUMBER_RULE_MESSAGE =
    'schema.sellers.individual_identity.id_number.invalid'

// rule id của người đại diện
export const REPRESENTATIVE_ID_NUMBER_RULE = /^[0-9]{9,12}$/
export const REPRESENTATIVE_ID_NUMBER_RULE_MESSAGE =
    'schema.sellers.business_identity.representative_id_number.invalid'
// Liên quan đến Validate File
export const LIMIT_COMMON_FILE_SIZE = 10485760 // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

export const PHONE_RULE = /^[0-9]{10,15}$/
export const PHONE_RULE_MESSAGE = 'schema.users.phoneNumber.invalid'
/* Sử dụng cho schema web */
export const SLUG_RULE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const SLUG_RULE_MESSAGE = 'schema.projects.slug.invalid'

/* export const URL_RULE =
    /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/ */

export const URL_RULE_MESSAGE = 'schema.projects.url.invalid'
