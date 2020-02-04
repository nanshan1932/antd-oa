<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.dictionaryModal.add()">新建</a-button>
      
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.dictionaryModal.edit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="delDict(record)">删除</a>
        </template>
      </span>

    </s-table>
    <dict-form ref="dictionaryModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import DictForm from './modules/DictForm'
import { getDictList, deleteDict } from '@/api/dictionary/dictionary'

export default {
  name: 'DictionaryList',
  components: {
    STable,
    Ellipsis,
    DictForm
  },
  data () {
    return {
      mdl: {},
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '编码',
          dataIndex: 'code'
        },
        {
          title: '类型',
          dataIndex: 'type'
        },
        {
          title: '类型描述',
          dataIndex: 'typeDes'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getDictList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

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
  created () {
    // this.tableOption()
    // getRoleList({ t: new Date() })
  },
  methods: {
    handleOk () {
      this.$refs.table.refresh()
    },
    delDict(record){
      deleteDict(record).then(res => {
            this.$refs.table.refresh()
          }).catch(error => {
              console.log(error)
          })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
