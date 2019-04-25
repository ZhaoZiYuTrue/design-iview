<template>
<div id="body">
    <div class="middle">
        <Card icon="log-in" title="账号密码登录" :bordered="false"> 
            <router-view/>
            <ul slot="extra"> 
                <li><router-link :to="{name: 'dym-login'}">动态登录</router-link></li>
            </ul>
            <Row style="padding: 10px">
                <i-Col><Input v-model="userName" icon="md-person" placeholder="此处输入账号" style="width: 250px" /></i-Col>
            </Row>
            <Row style="padding: 10px">
                <i-Col><Input v-model="password" icon="md-lock" placeholder="此处输入密码" style="width: 250px" /></i-Col>
            </Row>
                                
            <Row style="padding: 10px">
                <i-Col span="12"><Button type="primary" @click="login()" style="width: 100px;">登录</Button></i-Col>
                <i-Col span="12"><Button type="primary" @click="regist()" style="width: 100px;">注册</Button></i-Col>
            </Row>                                 
        </Card>
    </div>
</div>
</template>

<script>

export default {
    name: "login",
    data(){
      return{
        userName: '',
        password: '',        
      }
    },
    methods: {
        /* JSON.stringify(), */
      login() {
        const url = 'http://localhost:8080/login';
        this.$http.post(url,
        {          
            userName: this.userName, 
            password: this.password, 
            captcha: 0,
        },{emulateJSON: true})
        .then((response) =>{console.log(response);} ,(error) => {console.log(error);});
        /* const url = '/api/login';
        this.$http.get(url,
        {          
            userName: this.userName, 
            password: this.password, 
            captcha: 0,
        },{emulateJSON: true})
        .then((response) =>{console.log(response);} ,(error) => {console.log(error);}); */
        /* if(localStorage.name == this.userName && localStorage.password == this.password && this.userName !='' && this.password !=''){
                    this.userName = ''
                    this.password = ''
                    this.$router.push('/major')
                }else{
                    alert('用户名不存在或密码错误')
                }    */ 
      },
      regist(){
        this.$router.push('/regist')
      }
    },
}
</script>

<style scoped>
    
</style>