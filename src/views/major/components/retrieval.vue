<template>
    <div>  
        <Row style="border-bottom:1px solid #fff">
            <iCol span="4">
                <Select v-model="model1" style="width:200px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
            </iCol> 
            <iCol span="4">
                <Input v-model="model2" search placeholder=" 请输入查询的信息..." @on-search ="DatePicker()"/>
            </iCol> 
            <iCol span="4" offset='7'>
                <DatePicker v-model="startDate" type="datetime" placeholder="选择开始日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
                </DatePicker>
            </iCol>
            <iCol span="4">
                <DatePicker v-model="endDate" type="datetime" placeholder="选择结束日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
                </DatePicker>
            </iCol>   
        </Row>    
        <Table stripe border height="580" :columns="columns" :data='tableData'></Table>     
    </div>
</template>

<script>

export default {
    name: 'retrieval',
    data () {
        return {
            userId: '',
            userToken: '',
            startDate: '',
            endDate: '',
            columns: [
          { title: '@timestamp', key: '@timestamp',width: '200px' },
          { title: 'id', key: 'id', width: '80px'},
          { title: 'query', key: 'query',},
          { title: 'query_time', key: 'query_time',width: '150px'},
          { title: 'rows_examined', key: 'rows_examined', width: '150px'},
          { title: 'rows_sent', key: 'rows_sent', width: '100px'},
          { title: 'lock_time', key: 'lock_time', width: '100px'},
        ],
      tableData: [],
      cityList: [
        {
          value: '@timestamp',
          label: '@timestamp'
        },
        {
          value: 'id',
          label: 'id'
        },
        {
          value: 'query',
          label: 'query'
        },
        {
          value: 'query_time',
          label: 'query_time'
        },
        {
          value: 'rows_examined',
          label: 'rows_examined'
        },
        {
          value: 'rows_sent',
          label: 'rows_sent'
        },
        {
          value: 'lock_time',
          label: 'lock_time'
        },
      ],
      model1: '',
      model2: '',
    }
  },

  methods: {
      DatePicker() {
          var Rows = [];
          var startTime = new Date(this.startDate).getTime();
          var endTime = new Date(this.endDate).getTime();
          const url = '/api/mysql/log';
          this.$http.get(url,
          {      
              params: {
                  id: this.userId,
                  token: this.userToken,
                  startTime: startTime,
                  endTime: endTime,
                  pageNumber: 1,
                  content: this.model2,
                  field: this.model1,
              } 
          },{emulateJSON: true})
          .then((response) => {
              response.data.data.forEach(function(item) {
                  var timeStamp = new Date(item.timestamp);
                  var time = timeStamp.toLocaleString();
                  Rows.push({'@timestamp': time,'id': item.id,
                  'query': item.query,'query_time': item.query_time,'rows_examined': item.rows_examined,
                  'rows_sent': item.rows_sent,'lock_time': item.lock_time,});
              })
              this.tableData = Rows;
          });
      },
  },
  created(){
    this.userId = localStorage.getItem('id');
    this.userToken = localStorage.getItem('token');
    //this.DatePicker();
  }
}
</script>