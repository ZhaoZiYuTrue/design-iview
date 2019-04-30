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
                <i-Col><Input v-model="password" type='password' icon="md-lock" placeholder="此处输入密码" style="width: 250px" /></i-Col>
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
        login() {
            if(this.password !=''){
                if(this.userName !=''){
                    const url = '/api/login';
                    var formData = new FormData();
                    formData.append('userName',this.userName);
                    formData.append('password',this.password);
                    formData.append('captcha','0');
                    this.$http.post(url,formData
                    ,{emulateJSON: true})
                    .then((response) => {
                        console.log(response.data.code)
                        if(response.data.code == 0){
                            this.userName = ''
                            this.password = ''
                            this.$router.push('/major')
                        }else{
                            alert(response.data.msg)
                        }
                    });
                }else{
                    alert('密码不能为空')
                }
            }else{
                alert('用户名不能为空')
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