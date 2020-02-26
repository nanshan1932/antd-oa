import { axios } from '@/utils/request'
import moment from 'moment'

const api = {
  staffOnJobList: '/staff/getStaffOnJobPage',
  resignStaffList: '/staff/getResignStaffPage',
  addStaff: '/staff/addStaff',
  editStaff: '/staff/updateStaff',
  resign: '/staff/resign'
}

export default api

export function getStaffOnJobPage (parameter) {
  
  let serachParam = parameter;
  if(parameter.entryDate){
    serachParam.entryDateStart = moment(parameter.entryDate[0]).format('YYYY-MM-DD');
    serachParam.entryDateEnd = moment(parameter.entryDate[1]).format('YYYY-MM-DD');
  }
  //去除起止日期数组
  const {entryDate, ...param} = serachParam
  console.log("员工查询参数", param)
  return axios({
    url: api.staffOnJobList,
    method: 'get',
    params: param
  })
}

export function getResignStaffPage (parameter) {
  
  let serachParam = parameter;
  if(parameter.resignationDate){
    serachParam.resignationDateStart = moment(parameter.resignationDate[0]).format('YYYY-MM-DD');
    serachParam.resignationDateEnd = moment(parameter.resignationDate[1]).format('YYYY-MM-DD');
  }
  //去除起止日期数组
  const {resignationDate, ...param} = serachParam
  console.log("员工查询参数", param)
  return axios({
    url: api.resignStaffList,
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

export function resign (parameter) {
  let editParam = parameter;
  if(parameter.resignationDateMoment){
    editParam.resignationDate = moment(parameter.resignationDateMoment).format('YYYY-MM-DD')
  }
  if(parameter.stopMonthMoment){
    editParam.stopMonth = moment(parameter.stopMonthMoment).format('YYYY-MM')
  }
  
  //去除离职日期
  const {resignationDateMoment,stopMonthMoment, ...toResignParams} = editParam
  console.log("toResignParams:", toResignParams)
  return axios({
    url: api.resign,
    method: 'post',
    params: toResignParams
  })
}