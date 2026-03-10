import { createRouter, createWebHistory } from 'vue-router'
import TodoListsView from '@/views/TodoListsView.vue';
import RegisterView from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TodoListsView',
      component: TodoListsView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // {
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
      component: RegisterView,
    },
  ],
})

export default router
