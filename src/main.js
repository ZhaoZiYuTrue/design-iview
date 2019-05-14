import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';

import 'iview/dist/styles/iview.css';
import axios from 'axios';
import VeLine from 'v-charts/lib/line.common'
import VeGauge from 'v-charts/lib/gauge.common'
import VeBar from 'v-charts/lib/bar.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeRing from 'v-charts/lib/ring.common'
import VePie from 'v-charts/lib/pie.common'


Vue.use(VueRouter);
Vue.use(iView);
Vue.prototype.$http=axios;
Vue.component(VeLine.name, VeLine)
Vue.component(VeGauge.name, VeGauge)
Vue.component(VeBar.name, VeBar)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeRing.name, VeRing)
Vue.component(VePie.name, VePie)
/* Vue.prototype.$echarts = echarts; */
 
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
