import { createWebHistory, createRouter } from "vue-router";
import HomePage from './components/HomePage.vue'
import LoginPage from './components/LoginPage.vue'
import DriverPage from './components/DriverPage.vue'
import WuPage from './components/WuPage.vue'
import SignUp from './components/SignUp.vue'
import AdminPage from './components/AdminPage.vue'
import PurchasePage from './components/PurchasePage.vue'
import MainPage from './components/MainPage.vue'
import MyPage from './components/MyPage.vue'
const routes = [
  {
    path:'/',
    name:'HomePage',
    component: HomePage,
    children:[
      {
        path:'/',
        name:'MainPage',
        component: MainPage
      },
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
        path:'product/wu',
        name:'WuPage',
        component: WuPage,
      },
      {
        path:'product/purchase/:id',
        name:'PurchasePage',
        component:PurchasePage
      },
      {
        path:'customer/sign-up',
        component: SignUp,
        name: 'SignUp'
      },
      {
        path:'customer/mypage',
        component: MyPage,
        name: 'MyPage'
      }
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