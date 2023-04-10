import { createWebHistory, createRouter } from "vue-router";
import HomePage from './components/HomePage.vue'
import LoginPage from './components/LoginPage.vue'
import SignUp from './components/SignUp.vue'
import AdminPage from './components/AdminPage.vue'
import PurchasePage from './components/PurchasePage.vue'
import MainPage from './components/MainPage.vue'
import MyPage from './components/MyPage.vue'
import PurchaseComplete from './components/PurchaseComplete.vue'
import SearchPage from './components/SearchPage.vue'
import ProductsPage from './components/ProductsPage.vue'
import NonMemberPage from './components/NonMemberPage.vue'

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
      },
      {
        path:'product/submit',
        component : PurchaseComplete,
        name: 'PurchaseComplete'
      },
      {
        path:'search',
        component : SearchPage,
        name : 'SearchPage'
      },
      {
        path:'/product',
        component : ProductsPage,
        name :'ProductsPage'
      },
      {
        path:'/nonMemberOrder',
        component : NonMemberPage,
        name : 'NonMemberPage'
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