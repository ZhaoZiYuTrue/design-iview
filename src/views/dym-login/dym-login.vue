<template>
<div id="body">
    <div class="middle">
        <Card icon="log-in" title="动态密码登录" :bordered="false"> 
            <router-view/>
            <ul slot="extra"> 
                <li><router-link :to="{name: 'login'}">账号登录</router-link></li>
            </ul>
            <Row style="padding: 10px">
                <i-Col><Input v-model="phoneNum" icon="md-person" placeholder="此处输入手机号" style="width: 250px" /></i-Col>
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
                phoneNum: '',
                captcha: '', 
            }
        },
        methods: {
            login() {
                if(localStorage.name == this.name && localStorage.password == this.password && this.name !='' && this.password !=''){
                    this.name = ''
                    this.password = ''
                    this.$router.push('/user')
                }else{
                    alert('用户名不存在或密码错误')
                }    
            },
            send(){
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