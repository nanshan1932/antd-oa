<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input v-model="queryParam.name"  placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="性别">
              <a-select v-model="queryParam.sex" placeholder="请选择" >
                <a-select-option v-for="d in sexData" :key="d.value">{{d.text}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="部门">
                <a-tree-select
                    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                    :treeData="treeData"
                    v-model="queryParam.deptId" 
                    placeholder="请选择"
                    treeDefaultExpandAll
                  >
                </a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="生日">
                <a-input-number v-model="queryParam.birthDay" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="是否缴纳社保">
                <a-select v-model="queryParam.ssFlag" placeholder="请选择" >
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="2">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="职称">
                <a-input v-model="queryParam.title" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="24">
              <a-form-item label="离职日期">
                <a-range-picker v-model="queryParam.resignationDate" style="width: 100%" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
      :scroll="{ x: 2800 }"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <!--
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical" />
          <a @click="handleResignation(record)">离职</a>
        </template>
      </span>
      -->
    </s-table>
    <staff-form ref="staffFormModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StaffForm from './modules/StaffForm'
import { getResignStaffPage } from '@/api/staff/staff'
import { searchDictList } from '@/api/dictionary/dictionary'
import { TreeSelect } from 'ant-design-vue'
import { getDeptTree } from '@/api/dept/department'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'StaffList',
  components: {
    STable,
    Ellipsis,
    StaffForm,
    ATreeSelect : TreeSelect
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '姓名',
          width: 100,
          dataIndex: 'name'
        },
        {
          title: '性别',
          dataIndex: 'sexTxt',
          scopedSlots: { customRender: 'sex' }
        },
        {
          title: '身份证',
          dataIndex: 'idNumber'
        },
        {
          title: '学历',
          dataIndex: 'educationTxt'
        },
        {
          title: '民族',
          dataIndex: 'ethnicity'
        },
        {
          title: '婚姻状况',
          dataIndex: 'maritalStatusTxt'
        },
        {
          title: '部门',
          dataIndex: 'department'
        },
        {
          title: '岗位',
          dataIndex: 'postTxt',
          scopedSlots: { customRender: 'post' }
        },
        {
          title: '职称',
          dataIndex: 'title'
        },
        {
          title: '毕业院校',
          dataIndex: 'graduateInstitution'
        },
        {
          title: '专业',
          dataIndex: 'major'
        },
        {
          title: '生日',
          dataIndex: 'birthDay'
        },
        {
          title: '户口所在地',
          dataIndex: 'registeredPermanentResidence'
        },
        {
          title: '现住址',
          dataIndex: 'address'
        },
        {
          title: '入职日期',
          dataIndex: 'entryDate'
        },
        {
          title: '离职日期',
          dataIndex: 'resignationDate'
        },
        {
          title: '联系方式',
          dataIndex: 'telNumber'
        },
        {
          title: '紧急联系人',
          dataIndex: 'contactPerson'
        },
        {
          title: '紧急联系人电话',
          dataIndex: 'contactPersonTel'
        },
        {
          title: '合同期限',
          dataIndex: 'contractPeriod'
        },
        {
          title: '社保',
          dataIndex: 'ssFlagTxt'
        },
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   fixed: 'right',
        //   width: '150px',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getResignStaffPage(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      sexData: [],
      treeData: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    this.initSearchFilter();
  },
  methods: {
    initSearchFilter(){
        const that = this
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

        getDeptTree().then(res => {
            this.treeData = res.result
        })
    },
    handleEdit (record) {
      console.log(record)
      this.$refs.staffFormModal.edit(record)
    },
    handleResignation (record) {
    //   this.$refs.resignationModal.edit(record)
    },
    handleOk () {
      debugger
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
