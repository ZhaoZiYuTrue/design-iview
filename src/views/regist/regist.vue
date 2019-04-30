<template>
<div id="body">
    <div class="middle">
        <Card icon="log-in" title="请使用手机号码注册" :bordered="false">
            <Row style="padding: 10px">
                <i-Col><Input v-model="phoneNumber" icon="md-person" placeholder="请输入手机号码" style="width: 250px" /></i-Col>
            </Row> 
            <Row style="padding: 10px">
                <i-Col><Input v-model="userName" icon="md-person" placeholder="请输入用户名" style="width: 250px" /></i-Col>
            </Row>
            <Row style="padding: 10px">
                <i-Col><Input v-model="password" type="password" icon="md-lock" placeholder="请输入密码" style="width: 250px" /></i-Col>
            </Row>
            <Row style="padding: 10px">
                <i-Col><Input v-model="repeat" type="password" icon="md-lock" placeholder="请确认密码" style="width: 250px" /></i-Col>
            </Row>
            <Row style="padding: 10px">
                <i-Col span="18">
                    <Input v-model="captcha" placeholder="请输入验证码" style="width: 180px" />
                </i-Col>
                <i-Col span="6">
                    <Button v-show = "show" type="text" @click="send()" style="width: 60px">发送验证码</Button>
                    <Button v-show = "!show" type="text" style="width: 60px">{{count}}秒后重发</Button>
                </i-Col>
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
                show: true,
                count: '',
                timer: null,
                userName: '',
                password: '', 
                phoneNumber: '',
                repeat: '',
                captcha: '',
            }
        },
        methods:{
            addUser(){
                if (this.phoneNumber !='') {
                    if (this.userName !='') {
                        if (this.password !='') {
                            if(this.repeat !='') {
                                if (this.captcha !=''){
                                    if(this.password == this.repeat){
                                        const url = '/api/register';
                                        var formData = new FormData();
                                        formData.append('phoneNumber',this.phoneNumber);
                                        formData.append('userName',this.userName);
                                        formData.append('password',this.password);
                                        formData.append('captcha',this.captcha);
                                        this.$http.post(url,formData,
                                        {emulateJSON: true})
                                        .then((response) => {
                                            console.log(response.data.code)
                                            if(response.data.code == 0){
                                                this.userName = ''
                                                this.phoneNumber = ''
                                                this.repeat = ''
                                                this.password = ''
                                                this.captcha = ''                        
                                                alert('注册成功')
                                            }else{
                                                alert(response.data.msg)
                                            };                        
                                        });                                                            
                                    }else{
                                        alert('两次密码输入不一致')
                                    }
                                }else{                   
                                    alert('验证码不能为空')
                                }
                            }else{
                                alert('确认密码不能为空')
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
            },
            
            send(){
                const url ='/api/captcha';
                this.$http.get(url,
                {
                    params: {
                        phoneNumber: this.phoneNumber,
                        status: 0,
                    },
                },{emulateJSON: true})
                .then((response) => {
                    alert(response.data.msg);
                });
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
        }
        
    }
</script>

<style scoped>

</style>