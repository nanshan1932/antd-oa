import { axios } from '@/utils/request'
import moment from 'moment'

const api = {
  staff: '/staff/getStaffPage'
}

export default api

export function getStaffList (parameter) {
  let serachParam = parameter;
  if(parameter.entryDateStart){
    serachParam.entryDateStart = moment(parameter.entryDateStart).format('YYYY-MM-DD');
  }
  
  return axios({
    url: api.staff,
    method: 'get',
    params: serachParam
  })
}
