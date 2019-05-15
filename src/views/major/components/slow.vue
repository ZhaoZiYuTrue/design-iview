<template>
    <div>
        <Row style="border-bottom:1px solid #fff">
            <iCol span="4" offset='15'>
                <DatePicker v-model="startDate" @on-ok="DatePicker()" type="datetime" placeholder="选择开始日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
                </DatePicker>
            </iCol>
            <iCol span="4">
                <DatePicker v-model="endDate" @on-ok="DatePicker()" type="datetime" placeholder="选择结束日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
                </DatePicker>
            </iCol>
        </Row>
        <Row >
            <iCol span="12">
                <Card>
                    <p slot='title'>mysql慢查询-次数分布</p>   
                    <ve-histogram :data="chartData1" :settings="chartSettings1"></ve-histogram>
                </Card>
            </iCol>
            <iCol span="12">
                <Card>
                    <p slot='title'>mysql慢查询-查询类型比例</p>   
                    <ve-ring :data="chartData1" :settings="chartSettings2"></ve-ring>
                </Card>
            </iCol>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            this.chartSettings1 = {
                metrics: ['访问用户'],
                dimension: ['日期']
            },
            this.chartSettings2 = {
                dimension: '日期',
                metrics: '访问用户'
            }
            return {
                userId: '',
                userToken: '',
                startDate: '',
                endDate: '',
                chartData1: {
                    columns: ['日期', '访问用户'],
                    rows: [
                        { '日期': '1/1', '访问用户': 1393 },
                        { '日期': '1/2', '访问用户': 3530 },
                        { '日期': '1/3', '访问用户': 2923 },
                        { '日期': '1/4', '访问用户': 1723 },
                        { '日期': '1/5', '访问用户': 3792 },
                        { '日期': '1/6', '访问用户': 4593 }
                    ]
                },
            } 
        },
        methods: {
            DatePicker() {
                var startTime = new Date(this.startDate).getTime();
                var endTime = new Date(this.endDate).getTime();
                const url = '';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                        startTime: this.startTime,
                        endTime: this.endTime,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    
                });
            },
        }
    }
</script>

<style scoped>

</style>