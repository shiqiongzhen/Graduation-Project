import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      component: () => import('@/entry/display'),
      children: [
          { 
            path: '/courseList', alias: '/',
            component: () => import('@/page/display/courseList'),
          },
          { 
            path: '/user', 
            component: () => import('@/page/display/user'),
            children: [
              { 
                path: '/identify', 
                component: () => import('@/page/display/identify'),
              },
            ]
          },
          { 
            path: '/courseList/:detailId',
            component: () => import('@/page/display/course'),
            children: [
              { 
                path: '/courseList/experiment/:detailId',
                component: () => import('@/page/display/courseExperiment/index'),
              },
              { 
                path: '/courseList/resource/:detailId',
                component: () => import('@/page/display/courseResource'),
              },
              { 
                path: '/courseList/detail/:detailId',
                component: () => import('@/page/display/courseDetail'),
              },
              { 
                path: '/courseList/score/:detailId',
                component: () => import('@/page/display/courseScore'),
              },
            ]
          },
          {
            path: '/courseList/:detailId/:experimentId',
            component: () => import('@/page/display/courseExperiment/doExperiment/index'),
            children: [
              {
                path: '/courseList/:detailId/resource/:experimentId',
                component: () => import('@/page/display/courseExperiment/doExperiment/resource')
              },
              {
                path: '/courseList/:detailId/answer/:experimentId',
                component: () => import('@/page/display/courseExperiment/doExperiment/answer')
              },
              {
                path: '/courseList/:detailId/evaluation/:experimentId',
                component: () => import('@/page/display/courseExperiment/doExperiment/evaluation')
              }
            ],
          }
        ]
    }, 
    {
      path: '/login',
      component: () => import('@/page/login'),
    },
    {
      path: '/admin',
      component: () => import('@/entry/admin'),
    },
  ]
})
