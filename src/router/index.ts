import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../components/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/tabs/cards'},
  {
    path: '/tabs',
    component :Tabs,
    children:
    [
      { path: '', redirect: '/tabs/cards'},
      { 
        path: 'cards', 
        component: () => import('@/components/tabs/CardsTab.vue')
      },
      { 
        path: 'decks', 
        component: () => import('@/components/tabs/DecksTab.vue'),
        children:
        [
          {
            path: 'decklist/:id',
            component: () => import('@/shared/components/DeckDetail.vue')
          }
        ]
      },
      { 
        path: 'filters', 
        component: () => import('@/components/tabs/FiltersTab.vue')
      },
    ]
      

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
