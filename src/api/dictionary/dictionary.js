import { axios } from '@/utils/request'

const api = {
  dict: '/dict/dictList'
}

export default api

export function getDictList (parameter) {
  return axios({
    url: api.dict,
    method: 'get',
    params: parameter
  })
}
