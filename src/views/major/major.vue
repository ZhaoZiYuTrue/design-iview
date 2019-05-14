<template>
    <div class="layout">
            <Layout :style="{minHeight: '100vh'}">
                <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu active-name="user" theme="dark" width="auto" :class="menuitemClasses" @on-select="turnToPage">
                        <MenuItem name="retrieval">
                            <Icon type="ios-search"></Icon>
                            <span>检索</span>
                        </MenuItem>
                        <MenuItem name="cpu">
                            <Icon type="ios-calculator"></Icon>
                            <span>CPU状态</span>
                        </MenuItem>
                        <MenuItem name="memory">
                            <Icon type="ios-albums"/>
                            <span>内存状态</span>
                        </MenuItem>
                        <MenuItem name="netflow">
                            <Icon type="ios-barcode-outline" />
                            <span>流量数据</span>
                        </MenuItem>
                        <MenuItem name="internet">
                            <Icon type="ios-planet"></Icon>
                            <span>网络统计 </span>
                        </MenuItem>
                        <MenuItem name="slow">
                            <Icon type="md-infinite"></Icon>
                            <span>慢查询</span>
                        </MenuItem>
                        <MenuItem name="user">
                            <Icon type="ios-settings"></Icon>
                            <span>个人中心</span>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout>
                    <Header :style="{padding: 0}" class="layout-header-bar">
                        <Row>
                        <iCol span="1">
                            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                        </iCol>
                        <iCol span="2" offset="21">
                            <router-link :to="{name: 'login'}">退出登录</router-link>
                        </iCol>
                        </Row>
                    </Header>
                    
                    <div :style="{margin: '20px', background: '#fff'}">
                        
                            <router-view :key="1"></router-view>
    
                    </div>
                    
                </Layout>
            </Layout>    
    </div>
</template>
<script>

    export default {
        data () {
            return {
                isCollapsed: false,
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            key() {
                return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            turnToPage (route) {
                let { name, params, query } = {}
                if (typeof route === 'string') name = route
                else {
                    name = route.name
                    params = route.params
                    query = route.query
                }
                this.$router.push({
                    name,
                    params,
                    query
                })   
            },

        },
    }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        border-bottom-color: #fff
    }
    .layout-logo-left{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>