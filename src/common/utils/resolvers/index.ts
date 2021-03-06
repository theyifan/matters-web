import clientInfo from './clientInfo'
import clientPreference from './clientPreference'
import commentDraft from './commentDraft'
import gatewayUrls from './gatewayUrls'
import lastFetchRandom from './lastFetchRandom'

export default {
  Query: {
    commentDraft,
    clientPreference,
    clientInfo,
    lastFetchRandom,
  },
  Official: {
    gatewayUrls,
  },
}
