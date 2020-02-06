import { axios } from '@/utils/request'
import moment from 'moment'

const api = {
  staffList: '/staff/getStaffPage',
  addStaff: '/staff/addStaff'
}

export default api

export function getStaffList (parameter) {
  
  let serachParam = parameter;
  if(parameter.entryDate){
    serachParam.entryDateStart = moment(parameter.entryDate[0]).format('YYYY-MM-DD');
    serachParam.entryDateEnd = moment(parameter.entryDate[1]).format('YYYY-MM-DD');
  }
  //去除起止日期数组
  const {entryDate, ...param} = serachParam
  console.log("员工查询参数", param)
  return axios({
    url: api.staffList,
    method: 'get',
    params: param
  })
}

export function addStaff (parameter) {
  return axios({
    url: api.addStaff,
    method: 'post',
    params: parameter
  })
}