import { axios } from '@/utils/request'

const api = {
  dictList: '/dict/dictList',
  addDict: '/dict/addDict',
  updateDict: '/dict/updateDict',
  deleteDict: '/dict/deleteDict'
}

export default api

export function getDictList (parameter) {
  return axios({
    url: api.dictList,
    method: 'get',
    params: parameter
  })
}

export function addDict (parameter) {
  return axios({
    url: api.addDict,
    method: 'post',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function updateDict (parameter) {
  return axios({
    url: api.updateDict,
    method: 'post',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function deleteDict (parameter) {
  return axios({
    url: api.deleteDict,
    method: 'post',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

