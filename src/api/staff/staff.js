import { axios } from '@/utils/request'
import moment from 'moment'

const api = {
  staffList: '/staff/getStaffPage',
  addStaff: '/staff/addStaff'
}

export default api

export function getStaffList (parameter) {
  let serachParam = parameter;
  if(parameter.entryDateStart){
    serachParam.entryDateStart = moment(parameter.entryDateStart).format('YYYY-MM-DD');
  }
  
  return axios({
    url: api.staffList,
    method: 'get',
    params: serachParam
  })
}

export function addStaff (parameter) {
  debugger
  return axios({
    url: api.addStaff,
    method: 'post',
    params: parameter
  })
}