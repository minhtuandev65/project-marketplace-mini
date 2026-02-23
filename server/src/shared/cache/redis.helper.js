import crypto from 'crypto'

export const hashQuery = (query) =>
    crypto.createHash('md5').update(JSON.stringify(query)).digest('hex')
