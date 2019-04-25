<template>
  <div>  
    <Row style="border-bottom:1px solid #fff">
      <iCol span="4">
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </iCol>
      <iCol span="6" offset="1">
        <Input v-model="model2" search placeholder=" 请输入查询的信息..." />
      </iCol> 
      <iCol span="4" offset="9">
        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
      </iCol>
    </Row>    
    <Table stripe border height="200" :columns="columns"></Table>     
  </div>
</template>

<script>

export default {
  name: 'retrieval',
  data () {
    return {
      columns: [
        { title: '@Timestamp', key: 'timestamp', },
        { title: 'Action', key: 'action', },
        { title: 'ID', key: 'id' },
        { title: 'Query', key: 'query' },
        { title: 'Query_time', key: 'query_time' },
        { title: 'Rows_examined', key: 'row_examined' },
        { title: 'Rows_sent', key: 'row_sent' },
      ],
      tableData: [],
      cityList: [
        {
          value: 'mysql_log',
          label: 'mysql_log'
        },
        {
          value: 'internet_log',
          label: 'internet_log'
        },
        {
          value: 'hardware_log',
          label: 'hardware_log'
        },
      ],
      model1: '',
      model2: '',
    }
  },
  methods: {

  },

}
</script>

<style>
</style>
