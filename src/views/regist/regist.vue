<template>
<div id="body">
    <div class="middle">
        <Card icon="log-in" title="请使用手机号码注册" :bordered="false">
            <Row style="padding: 10px">
                <i-Col><Input v-model="phoneNum" icon="md-person" placeholder="请输入手机号码" style="width: 250px" /></i-Col>
            </Row> 
            <Row style="padding: 10px">
                <i-Col><Input v-model="name" icon="md-person" placeholder="请输入账号" style="width: 250px" /></i-Col>
            </Row>
            <Row style="padding: 10px">
                <i-Col><Input v-model="password" icon="md-lock" placeholder="请输入密码" style="width: 250px" /></i-Col>
            </Row>
            <Row style="padding: 10px">
                <i-Col><Input v-model="repeat" icon="md-lock" placeholder="请确认密码" style="width: 250px" /></i-Col>
            </Row>                     
            <Row style="padding: 10px">
                <i-Col span="12"><Button type="primary" @click="addUser()" style="width: 100px">确认</Button></i-Col>
                <i-Col span="12"><Button type="primary" @click="cancel()" style="width: 100px">取消</Button></i-Col>
            </Row>                                 
        </Card>
    </div>
</div>
</template>

<script>
    export default {
        name: "regist",
        data(){
            return{
                name: '',
                password: '', 
                phoneNum: '',
                repeat: '', 
            }
        },
        methods:{
            addUser(){
                if (this.phoneNum !='') {
                    if (this.name !='') {
                        if (this.password !='') {
                            if(this.password == this.repeat){
                                localStorage.setItem("phoneNum", this.phoneNum)
                                localStorage.setItem("name", this.name)
                                localStorage.setItem("password", this.password)
                                this.name = ''
                                this.phoneNum = ''
                                this.repeat = ''
                                this.password = ''
                                alert('注册成功')
                            }else{                   
                                alert('两次密码输入不一致')
                            }
                        } else {
                            alert('密码不能为空')
                        }
                    
                    } else {
                        alert('用户名不能为空')
                    }
                
                } else {
                    alert('手机号不能为空')
                }
            },
            cancel(){
                this.$router.push('/login')
            }
        }
        
    }
</script>

<style scoped>

</style>