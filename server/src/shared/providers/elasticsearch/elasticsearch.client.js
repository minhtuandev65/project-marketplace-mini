import { Client } from '@elastic/elasticsearch'
import { env } from '~/config/env/environment'

export const elasticClient = new Client({
    node: env.ELASTICSEARCH_NODE,
    auth: {
        apiKey: env.ELASTICSEARCH_API_KEY
    }
})
