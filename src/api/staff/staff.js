import { axios } from '@/utils/request'
import moment from 'moment'

const api = {
  staffList: '/staff/getStaffPage',
  addStaff: '/staff/addStaff',
  editStaff: '/staff/updateStaff'
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
  let saveParam = parameter;
  if(parameter.entryDateMoment){
    saveParam.entryDate = moment(parameter.entryDateMoment).format('YYYY-MM-DD')
  }
  //去除入职日期
  const {entryDateMoment, ...toSaveparam} = saveParam
  return axios({
    url: api.addStaff,
    method: 'post',
    params: toSaveparam
  })
}

export function editStaff (parameter) {
  let editParam = parameter;
  if(parameter.entryDateMoment){
    editParam.entryDate = moment(parameter.entryDateMoment).format('YYYY-MM-DD')
  }
  //去除入职日期
  const {entryDateMoment, ...toEditParams} = editParam
  console.log("toEditParams:", toEditParams)
  return axios({
    url: api.editStaff,
    method: 'post',
    params: toEditParams
  })
}