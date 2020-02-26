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
              <a-form-item label="离职日期">
                <a-date-picker v-decorator="['resignationDateMoment',{rules: [{required: true}]}]" style="width: 100%" placeholder="请选择日期"/>
              </a-form-item>
            </a-col>
            
            <a-col :md="8" :sm="24">
              <a-form-item label="断保月份">
                <a-month-picker v-decorator="['stopMonthMoment',{rules: [{required: true}]}]" style="width: 100%" placeholder="请选择月份"/>
              </a-form-item>
            </a-col>
        </a-row>
      </a-form>
    </a-spin>
    </div>
  </a-modal>
</template>

<script>
import { resign } from '@/api/staff/staff'
import { TreeSelect } from 'ant-design-vue'
import pick from 'lodash.pick'
import moment from 'moment'

export default {
  components:{ 
    ATreeSelect:TreeSelect 
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      formId: {},
      form: this.$form.createForm(this)
    }
  },
  created () {
    //初始化表单数据
  },
  methods: {
    edit(record) {
      this.visible = true
      console.log('参数为',record)
      this.formId = {id: record.id}
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, []))
      });
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          resign(Object.assign(values, this.formId)).then(res => {
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', values)
          }).catch(error => {
              console.log(error)
          }).finally(()=>{
              this.visible = false
              this.confirmLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
  }
}
</script>
