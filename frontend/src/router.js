import { createWebHistory, createRouter } from "vue-router";
import HomePage from './components/HomePage.vue'
import LoginPage from './components/LoginPage.vue'
import DriverPage from './components/Driver/DriverPage.vue'
import DriverPing from './components/Driver/DriverPing.vue'
import DriverTaylor from './components/Driver/DriverTaylor.vue'
import DriverPxg from './components/Driver/DriverPxg.vue'
import DriverTitle from './components/Driver/DriverTitle.vue'
import DriverHonma from './components/Driver/DriverHonma.vue'
import DriverXxio from './components/Driver/DriverXxio.vue'
import DriverYamaha from './components/Driver/DriverYamaha.vue'
import DriverMizuno from './components/Driver/DriverMizuno.vue'
import DriverFourteen from './components/Driver/DriverFourteen.vue'
import DriverMajesty from './components/Driver/DriverMajesty.vue'
import WuPage from './components/wu/WuPage.vue'
import WuPing from './components/wu/WuPing.vue'
import WuTaylor from './components/wu/WuTaylor.vue'
import WuPxg from './components/wu/WuPxg.vue'
import WuTitle from './components/wu/WuTitle.vue'
import WuHonma from './components/wu/WuHonma.vue'
import WuXxio from './components/wu/WuXxio.vue'
import WuYamaha from './components/wu/WuYamaha.vue'
import WuMizuno from './components/wu/WuMizuno.vue'
import WuFourteen from './components/wu/WuFourteen.vue'
import WuMajesty from './components/wu/WuMajesty.vue'
import SignUp from './components/SignUp.vue'
import AdminPage from './components/admin/AdminPage.vue'
const routes = [
  {
    path:'/',
    name:'HomePage',
    component: HomePage,
    children:[
      {
        path:'customer/login',
        name:'LoginPage',
        component: LoginPage
      },
      {
        path:'product/driver',
        name:'DriverPage',
        component: DriverPage,
      },
      {
        path:'product/driver/ping',
        component: DriverPing,
        name:'DriverPing'
      },
      {
        path:'product/driver/taylormade',
        component: DriverTaylor,
        name:'DriverTaylor'
      },
      {
        path:'product/driver/pxg',
        component: DriverPxg,
        name:'DriverPxg'
      },
      {
        path:'product/driver/titleist',
        component: DriverTitle,
        name: 'DriverTitle'
      },
      {
        path:'product/driver/Honma',
        component: DriverHonma,
        name: 'DriverHonma'
      },
      {
        path:'product/driver/xxio',
        component: DriverXxio,
        name: 'DriverXxio'
      },
      {
        path:'product/driver/yamaha',
        component: DriverYamaha,
        name: 'DriverYamaha'
      },
      {
        path:'product/driver/mizuno',
        component: DriverMizuno,
        name: 'DriverMizuno'
      },
      {
        path:'product/driver/fourteen',
        component: DriverFourteen,
        name: 'DriverFourteen'
      },
      {
        path:'product/driver/majesty',
        component: DriverMajesty,
        name: 'DriverMajesty'
      },
      {
        path:'product/wu',
        name:'WuPage',
        component: WuPage,
      },
      {
        path:'product/wu/ping',
        component: WuPing,
        name:'WuPing'
      },
      {
        path:'product/wu/taylormade',
        component: WuTaylor,
        name:'WuTaylor'
      },
      {
        path:'product/wu/pxg',
        component: WuPxg,
        name:'WuPxg'
      },
      {
        path:'product/wu/titleist',
        component: WuTitle,
        name: 'WuTitle'
      },
      {
        path:'product/wu/Honma',
        component: WuHonma,
        name: 'WuHonma'
      },
      {
        path:'product/wu/xxio',
        component: WuXxio,
        name: 'WuXxio'
      },
      {
        path:'product/wu/yamaha',
        component: WuYamaha,
        name: 'WuYamaha'
      },
      {
        path:'product/wu/mizuno',
        component: WuMizuno,
        name: 'WuMizuno'
      },
      {
        path:'product/wu/fourteen',
        component: WuFourteen,
        name: 'WuFourteen'
      },
      {
        path:'product/wu/majesty',
        component: WuMajesty,
        name: 'WuMajesty'
      },
      {
        path:'customer/sign-up',
        component: SignUp,
        name: 'SignUp'
      },
    ]
  },
  
  {
    path:'/secret/security/administrator/admin-page',
    component: AdminPage,
    name: 'AdminPage'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;