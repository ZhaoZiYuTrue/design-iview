<template>
<div id="body">
    <div class="middle">
        <Card icon="log-in" title="动态密码登录" :bordered="false"> 
            <router-view/>
            <ul slot="extra"> 
                <li><router-link :to="{name: 'login'}">账号登录</router-link></li>
            </ul>
            <Row style="padding: 10px">
                <i-Col><Input v-model="phone_Number" icon="md-person" placeholder="此处输入手机号" style="width: 250px" /></i-Col>
            </Row>
            <Row style="padding: 10px">
                <i-Col span="18">
                    <Input v-model="captcha" placeholder="此处输入验证码" style="width: 180px" />
                </i-Col>
                <i-Col span="6">
                    <Button v-show = "show" type="text" @click="send()" style="width: 60px">发送验证码</Button>
                    <Button v-show = "!show" type="text" style="width: 60px">{{count}}秒后重发</Button>
                </i-Col>
            </Row>                    
            <Row style="padding: 10px; margin: auto;">
                <i-Col style="margin: auto;"><Button type="primary" @click="login()" style="width: 248px; margin: auto;">登录</Button></i-Col>
            </Row>                                 
        </Card>
    </div>
</div>
</template>

<script>
    export default {
        name: "dym-login",
        data() {
            return {
                show: true,
                count: '',
                timer: null,
                phone_Number: '',
                captcha: '', 
            }
        },
        methods: {
            login() {
                const url = 'http://localhost:8080/dynamicLogin';
                this.$http.post(url,
            {          
                phone_Number: this.phone_Number,
                captcha: this.captcha,
            },{emulateJSON: true})
            .then((response) =>{console.log(response);} ,(error) => {console.log(error);});
                if(this.name !='' && this.password !='' && response.code == 0){
                    this.name = ''
                    this.captcha = ''
                    this.$router.push('/user')
                }else{
                    alert('用户名不存在或验证码错误')
                }    
            },
            send(){
                const url = 'http://localgost:8080/captcha';
                this.$http.get(url,
            {
                phoneNumber: this.phone_Number,
                status: 1,
            },{emulateJSON: true})
            .then((response) =>{console.log(response);} ,(error) => {console.log(error);});
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
        },
    }
</script>

<style scoped>

</style>