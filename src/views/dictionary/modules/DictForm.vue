<template>
  <a-modal
    title="新增字典"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules: [{required: true, message: '名称必填！'}]}]" />
        </a-form-item>
        <a-form-item
          label="编码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input-number v-decorator="['code', {rules: [{required: true, message: '编码必填！'}]}]" />
        </a-form-item>
        <a-form-item
          label="类别"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input-number v-decorator="['type', {rules: [{required: true, message: '类别必填！'}]}]" />
        </a-form-item>
        <a-form-item
          label="类别描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['typeDes', {rules: [{required: true, message: '类别描述必填！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addDict, updateDict } from '@/api/dictionary/dictionary'

export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      formId: {},
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
      this.form.resetFields()
    },
    edit(record){
      this.visible = true
      let {id, ...editRecord} = record
      this.formId = {id: record.id}
      this.$nextTick(() => {
        this.form.setFieldsValue({ ...editRecord })
      });
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          debugger
          const that = this;
          if(this.formId.id){
            updateDict(Object.assign(values,this.formId)).then(res => {
              console.log('result', res.result)
              that.visible = false
              that.confirmLoading = false
              that.$emit('ok', values)
            }).catch(error => {
              console.log(error)
            })
          }else{
            addDict(Object.assign(values)).then(res => {
              console.log('result', res.result)
              that.visible = false
              that.confirmLoading = false
              that.$emit('ok', values)
            }).catch(error => {
              console.log(error)
            })
          }
          
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
