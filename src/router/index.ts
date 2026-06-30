import { createRouter, createWebHistory } from 'vue-router'
import TodoListsView from '@/views/TodoListsView.vue';
import AccountView from '@/views/AccountView.vue';
import AddView from '@/views/AddView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TodoListsView',
      component: TodoListsView,
    },
    // { this is just an Example to mantain
    //   path: '/:toDotype/:toDoListID',
    //   name: 'todolist',
    //   component: ToDoList,
    //   props: route => ({
    //     toDotype: route.params.toDotype as string,
    //     toDoListID: Number(route.params.toDoListID)
    //   })
    // },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (RegisterView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/RegisterView.vue'),
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/add',
      name: 'AddNewItem',
      component: AddView
    }
  ],
})

export default router
