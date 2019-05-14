<template>
<div id="body">
    <div class="middle">
        <Card icon="log-in" title="动态密码登录" :bordered="false"> 
            <router-view/>
            <ul slot="extra"> 
                <li><router-link :to="{name: 'login'}">账号登录</router-link></li>
            </ul>
            <Row style="padding: 10px">
                <i-Col><Input v-model="phoneNumber" icon="md-person" placeholder="此处输入手机号" style="width: 250px" /></i-Col>
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
                phoneNumber: '',
                captcha: '',
            }
        },
        methods: {
            login() {
                if(this.phoneNumber !=''){
                    if(this.captcha !=''){
                        const url = '/api/dynamicLogin';
                        var formData = new FormData();
                        formData.append('phoneNumber',this.phoneNumber)
                        formData.append('captcha',this.captcha)
                        this.$http.post(url,formData,
                        {emulateJSON: true})
                        .then((response) => {
                            console.log(response.data.code)
                            if(response.data.code == 0){
                                this.phoneNumber = ''
                                this.captcha = ''
                                this.$router.push('/major')
                            }else{
                                alert(response.data.msg)
                            }  
                        });    
                    } else{    
                        alert('验证码不能为空')
                    }
                }else{                
                    alert('手机号不能为空')
                }    
            },        
            
            send(){
                const url = '/api/captcha';
                this.$http.get(url,
                {
                    params: {
                        phoneNumber: this.phoneNumber,
                        status: 1,
                    },
                },{emulateJSON: true})
                .then((response) => {
                    /* global_.Id = response.data.data.id;
                    global_.Token = response.data.data.token; */
                    alert(response.data.msg);
                    localStorage.setItem("id",response.data.data.id);
                    localStorage.setItem("token",response.data.data.token);
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
        },
    }
</script>

<style scoped>

</style>