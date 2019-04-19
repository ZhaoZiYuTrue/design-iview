<template>    
    <div>
        <h>{{message}}</h>
        <!-- <portal-target name="destination"  :slot-props="{message: 'Hello from the Target to You!'}"/> -->
        <!-- <router-view :key="retrieval"></router-view> -->
    </div>
</template>

<script>
    export default {
        name: "retrieval",
        data(){
            return{
                message: "1111111111"
            };
        },
        /* computed: {
            key() {
                return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
            }
        }, */
    }
</script>

<style scoped>

</style>
