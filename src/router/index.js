import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/appLayout.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/components/util/barGrafic.vue')
        },

        {
          path: '/table',
          name: 'table',
          component: () => import('@/views/ListadoTable.vue')
        },

          {
            path: '/graph',
            name: 'graph',
            component: () => import('@/views/GraficosPage.vue')
          },
          {
            path: '/sesion',
            name: 'sesion',
            component: () => import('@/views/sesion/sessions_actas.vue')
          },
          {
            path: '/SesionView/:idSesion',
            name: 'SesionView',
            component: () => import('@/views/sesion/SesionGeneralView.vue')

          },
          {
            path: '/printPage/:idSesion',
            name: 'printPage',
            component: () => import('@/views/sesion/pringPage.vue')
          },
          {
            path: '/tareas',
            name: 'tareas',
            component: () => import('@/views/tareas/tareas_actas.vue')
          },
          {
            path: '/invitacion',
            name: 'invitacion',
            component: () => import('@/views/invitacion/InvitationView.vue')
          },
          {
            path: '/actas',
            name: 'actas',
            component: () => import('@/views/actas/actas.vue')
          },
          {
            path: '/solicitudes',
            name: 'solicitudes.index',
            component: () => import('@/views/solicitudes/SolicitudesView.vue')
          },
          {
            path: '/descripciones',
            name: 'descripciones.index',
            component: () => import('@/views/descripciones/DescripcionesView.vue')
          },


          /* SOLICITANTES */
          {
            path: '/solicitantes',
            name: 'solicitantes.index',
            component: () => import('@/views/solicitantes/SolicitantesView.vue')
          },
         
      ]
    },

    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/layout/authLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/loginApp.vue')
        },

        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/registerUser.vue')
        }
      ]
    }
  ]
})

export default router
