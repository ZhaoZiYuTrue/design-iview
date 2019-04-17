<template>
<div id="body">
    <div class="middle">
        <Card icon="log-in" title="账号密码登录" :bordered="false"> 
            <router-view/>
            <ul slot="extra"> 
                <li><router-link :to="{name: 'dym-login'}">动态登录</router-link></li>
            </ul>
            <Row style="padding-left: 16px; padding-top: 16px; padding-bottom: 16px;">
                <Col span="24"><Input class="middle.line" v-model="name" icon="md-person" placeholder="此处输入账号" style="width: 300px" /></Col>
            </Row>
            <Row style="padding-left: 16px; padding-top: 16px; padding-bottom: 16px;">
                <Col span="24"><Input class="middle.line" v-model="password" icon="md-lock" placeholder="此处输入密码" style="width: 300px" /></Col>
            </Row>                    
            <Row style="padding-left: 40px; padding-top: 24px; padding-bottom: 16px;">
                <Col span="12"><Button type="primary" @click="login()" style="width: 100px">登录</Button></Col>
                <Col span="12"><Button type="primary" @click="regist()" style="width: 100px">注册</Button></Col>
            </Row>                                 
        </Card>
    </div>
</div>
</template>

<script>

export default {
    
}
</script>

<style scoped>
    
</style>
body{
    background-image: url(../assets/images/login-bg.jpg); 
    background-size: 100% 100%;
    height: 100%;
	overflow: hidden;
	background-repeat: no-repeat;
	background-position: center;
	background-attachment: fixed;
}
.middle {
    text-align: left;
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
}
