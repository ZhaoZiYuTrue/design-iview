<template>
    <div>
        <Row style="border-bottom:1px solid #fff">
            <iCol span="4" offset="20">
                <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
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
        }
    }
</script>

<style scoped>

</style>