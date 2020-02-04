import { axios } from '@/utils/request'

const api = {
  deptList: '/dept/deptList',
  addDepartment:'/dept/addDept'
}

export default api

export function getDeptTree (parameter) {
  return axios({
    url: api.deptList,
    method: 'get',
    params: parameter
  })
}

export function addDept (parameter) {
  return axios({
    url: api.addDepartment,
    method: 'post',
    params: parameter
  })
}
