<template>
  <a-modal
    title="员工基本信息"
    :width="1045"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <div class="table-page-search-wrapper">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="inline">
        <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="姓名">
                <a-input v-decorator="['name', {rules: [{required: true}]}]" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="性别">
                <a-select  v-decorator="['sex', {rules: [{required: true}]}]" placeholder="请选择">
                    <a-select-option v-for="d in sexData" :key="d.value">{{d.text}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="身份证">
                <a-input v-decorator="['idNumber', {rules: [{required: true}]}]" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="学历">
                <a-select v-decorator="['education', {rules: [{required: true}]}]" placeholder="请选择">
                    <a-select-option v-for="d in educationData" :key="d.value">{{d.text}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="民族">
                <a-input v-decorator="['ethnicity', {rules: [{required: true}]}]" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="婚姻状况">
                <a-select v-decorator="['maritalStatus', {rules: [{required: true}]}]" placeholder="请选择">
                    <a-select-option v-for="d in maritalData" :key="d.value">{{d.text}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="部门">
                <a-tree-select
                    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                    :treeData="treeData"
                    v-decorator="['deptId', {rules: []}]"
                    placeholder="请选择"
                    treeDefaultExpandAll
                  >
                </a-tree-select>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="岗位">
                <a-select showSearch :filterOption="filterOption" v-decorator="['post', {rules: [{required: true}]}]" placeholder="请选择">
                    <a-select-option v-for="d in postData" :key="d.value">{{d.text}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="职称">
                <a-input v-decorator="['title', {rules: []}]" />
              </a-form-item>
            </a-col>
            
            <a-col :md="8" :sm="24">
              <a-form-item label="毕业院校">
                <a-input v-decorator="['graduateInstitution', {rules: []}]" />
              </a-form-item>
            </a-col>
            
            <a-col :md="8" :sm="24">
              <a-form-item label="专业">
                <a-input v-decorator="['major', {rules: []}]" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="生日">
                <a-input v-decorator="['birthDay', {rules: [{required: true}]}]" />
              </a-form-item>
            </a-col>
            
            <a-col :md="8" :sm="24">
              <a-form-item label="入职日期">
                <a-date-picker v-decorator="['entryDateMoment',{rules: [{required: true}]}]" style="width: 100%" placeholder="请选择日期"/>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="户口所在地">
                <a-input v-decorator="['registeredPermanentResidence', {rules: [{required: true}]}]" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="现住址">
                <a-input v-decorator="['address', {rules: []}]" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="联系方式">
                <a-input v-decorator="['telNumber', {rules: [{required: true}]}]" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="紧急联系人">
                <a-input v-decorator="['contactPerson', {rules: []}]" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="紧急联系人电话">
                <a-input v-decorator="['contactPersonTel', {rules: []}]" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="合同期限">
                <a-input v-decorator="['contractPeriod', {rules: []}]" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="是否缴纳社保">
                <a-select  v-decorator="['ssFlag', {rules: []}]" placeholder="请选择">
                  <a-select-option v-for="d in ssData" :key="d.value">{{d.text}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
        </a-row>
      </a-form>
    </a-spin>
    </div>
  </a-modal>
</template>

<script>
import { addStaff, editStaff } from '@/api/staff/staff'
import { searchDictList } from '@/api/dictionary/dictionary'
import { TreeSelect } from 'ant-design-vue'
import { getDeptTree } from '@/api/dept/department'
import moment from 'moment'

export default {
  components:{ 
    ATreeSelect:TreeSelect 
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      ssData: [], 
      sexData: [],
      educationData: [],
      maritalData: [],
      postData: [],
      treeData: [],
      formId: {},
      form: this.$form.createForm(this)
    }
  },
  created () {
    //初始化表单数据
    this.initFormData();
  },
  methods: {
    add () {
      this.visible = true
      this.formId = {}
      this.form.resetFields()
    },
    edit(record) {
      this.visible = true
      console.log('参数为',record)
      const formData = {
        name: record.name,
        sex: record.sex,
        idNumber: record.idNumber,
        education: record.education,
        ethnicity: record.ethnicity,
        maritalStatus: record.maritalStatus,
        deptId: record.deptId + '',
        post: record.post,
        title: record.title,
        graduateInstitution: record.graduateInstitution,
        major: record.major,
        birthDay: record.birthDay,
        registeredPermanentResidence: record.registeredPermanentResidence,
        address: record.address,
        entryDateMoment: moment(record.entryDate, "YYYY-MM-DD"),
        // resignationDate: record.resignationDate,
        telNumber: record.telNumber,
        contactPerson: record.contactPerson,
        contactPersonTel: record.contactPersonTel,
        contractPeriod: record.contractPeriod,
        ssFlag: record.ssFlag
      }
      this.formId = {id: record.id}
      this.$nextTick(() => {
        this.form.setFieldsValue(formData)
      });
    },
    initFormData(){
        const that = this
        //是否缴纳社保
        searchDictList({type:1000}).then(res => {
            if(Array.isArray(res) && res.length > 0){
              res.forEach(function (value,index) {
                  that.ssData.push({
                    value: value.code,
                    text: value.name
                  })
              })
            }
        })
        //性别
        searchDictList({type:1001}).then(res => {
            if(Array.isArray(res) && res.length > 0){
              res.forEach(function (value,index) {
                  that.sexData.push({
                    value: value.code,
                    text: value.name
                  })
              })
            }
        })

        //学历
        searchDictList({type:1002}).then(res => {
            if(Array.isArray(res) && res.length > 0){
              res.forEach(function (value,index) {
                  that.educationData.push({
                    value: value.code,
                    text: value.name
                  })
              })
            }
        })

        //婚姻状况
        searchDictList({type:1003}).then(res => {
            if(Array.isArray(res) && res.length > 0){
              res.forEach(function (value,index) {
                  that.maritalData.push({
                    value: value.code,
                    text: value.name
                  })
              })
            }
        })

        //岗位
        searchDictList({type:1004}).then(res => {
            if(Array.isArray(res) && res.length > 0){
              res.forEach(function (value,index) {
                  that.postData.push({
                    value: value.code,
                    text: value.name
                  })
              })
            }
        })

        getDeptTree().then(res => {
            this.treeData = res.result
        })

    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          if(this.formId.id){
              editStaff(Object.assign(values, this.formId)).then(res => {
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
              }).catch(error => {
                console.log(error)
              }).finally(()=>{
                this.visible = false
                this.confirmLoading = false
              })
          }else{
             addStaff(Object.assign(values)).then(res => {
                this.visible = false
                this.confirmLoading = false
                this.$emit('ok', values)
             }).catch(error => {
                console.log(error)
             }).finally(()=>{
                this.visible = false
                this.confirmLoading = false
             })
          }
          
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
  }
}
</script>
