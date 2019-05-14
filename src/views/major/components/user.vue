<template>

    <Steps :current="0">
        <Step title="修改个人信息" content="改密；动态改密；换手机；"></Step>
        <Step title="改密安全验证" content="id；oldPwd；newPwd；"></Step>
        <Step title="动态改密安全验证" content="phoneNumber；captcha；newPwd；"></Step>
        <Step title="换手机安全验证" content="id；captcha；newPhone；password；"></Step>
    </Steps>
</template>
<script>
    export default {
        
    }
</script>