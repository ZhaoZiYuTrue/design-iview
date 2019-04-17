<template>
<div id="body">
    <div class="middle">
        <Card icon="log-in" title="账号密码登录" :bordered="false"> 
            <router-view/>
            <ul slot="extra"> 
                <li><router-link :to="{name: 'dym-login'}">动态登录</router-link></li>
            </ul>
            <Row style="padding: 10px">
                <i-Col><Input v-model="name" icon="md-person" placeholder="此处输入账号" style="width: 250px" /></i-Col>
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
        name: '',
        password: '',        
      }
    },
    methods: {
      login() {
        if(localStorage.name == this.name && localStorage.password == this.password && this.name !='' && this.password !=''){
                    this.name = ''
                    this.password = ''
                    this.$router.push('/major')
                }else{
                    alert('用户名不存在或密码错误')
                }    
      },
      regist(){
        this.$router.push('/regist')
      }
    },
}
</script>

<style scoped>
    
</style>