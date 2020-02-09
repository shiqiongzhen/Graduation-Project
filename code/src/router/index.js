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
      path: '/', alias: '/login',
      component: () => import('@/page/login'),
    },
    {
      path: '/display',
      component: () => import('@/entry/display'),
      children: [
          { 
            path: '/courseList', alias: '/display',
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
            path: '/courseList/:courseId',
            component: () => import('@/page/display/course'),
            children: [
              { 
                path: '/courseList/experiment/:courseId',
                component: () => import('@/page/display/courseExperiment/index'),
              },
              { 
                path: '/courseList/resource/:courseId',
                component: () => import('@/page/display/courseResource'),
              },
              { 
                path: '/courseList/detail/:courseId',
                component: () => import('@/page/display/courseDetail'),
              },
              { 
                path: '/courseList/score/:courseId',
                component: () => import('@/page/display/courseScore'),
              },
            ]
          },
          {
            path: '/courseList/:courseId/:experimentId',
            component: () => import('@/page/display/courseExperiment/doExperiment/index'),
            children: [
              {
                path: '/courseList/:courseId/content/:experimentId',
                component: () => import('@/page/display/courseExperiment/doExperiment/content')
              },
              {
                path: '/courseList/:courseId/resource/:experimentId',
                component: () => import('@/page/display/courseExperiment/doExperiment/resource')
              },
              {
                path: '/courseList/:courseId/answer/:experimentId',
                component: () => import('@/page/display/courseExperiment/doExperiment/answer')
              },
              {
                path: '/courseList/:courseId/evaluation/:experimentId',
                component: () => import('@/page/display/courseExperiment/doExperiment/evaluation')
              }
            ],
          }
        ]
    }, 
    {
      path: '/admin',
      component: () => import('@/entry/admin'),
      children: [
          { 
            path: '/admin/courseList', alias: '/admin',
            component: () => import('@/page/admin/index'),
          },
          { 
            path: '/admin/user', 
            component: () => import('@/page/admin/user'),
            children: [
              { 
                path: '/admin/identify', 
                component: () => import('@/page/admin/identify'),
              },
            ]
          },
          { 
            path: '/admin/courseList/:courseId',
            component: () => import('@/page/admin/course'),
            children: [
              { 
                path: '/admin/courseList/experiment/:courseId',
                component: () => import('@/page/admin/courseExperiment/index'),
              },
              { 
                path: '/admin/courseList/experimentDetail/:courseId/:experimentId',
                component: () => import('@/page/admin/courseExperiment/detail'),
              },
              { 
                path: '/admin/courseList/resource/:courseId',
                component: () => import('@/page/admin/courseResource'),
              },
              { 
                path: '/admin/courseList/detail/:courseId',
                component: () => import('@/page/admin/courseDetail'),
              },
              { 
                path: '/admin/courseList/manage/:courseId',
                component: () => import('@/page/admin/courseManage/index'),
              },
              { 
                path: '/admin/courseList/manage/:courseId/:userId',
                component: () => import('@/page/admin/courseManage/detail'),
              },
              { 
                path: '/admin/courseList/manageClass/:courseId',
                component: () => import('@/page/admin/courseManage/classManage'),
              },
              { 
                path: '/admin/courseList/score/:courseId',
                component: () => import('@/page/admin/courseScore/index'),
              },
            ]
          },
          {
            path: '/admin/courseAdd',
            component: () => import('@/page/admin/addCourse'),
          },
          {
            path: '/admin/courseList/:courseId/experimentAdd',
            component: () => import('@/page/admin/courseExperiment/addExperiment'),
          },
          {
            path: '/admin/judge/:courseId/:experimentId/:userId',
            component: () => import('@/page/admin/courseScore/judge'),
          },
          {
            path: '/admin/judgeBatch/:courseId/:experimentId',
            component: () => import('@/page/admin/courseScore/judgeBatch'),
          }
      ]
    },
    {
      path: '/super',
      component: () => import('@/entry/super'),
      children: [
        { 
          path: '/super', alias: '/super', // 查看教师
          component: () => import('@/page/super/viewTeacher/index.vue'),
        },
        { 
          path: '/super/addTeacher',
          component: () => import('@/page/super/addTeacher/index.vue'),
          // children: [
          //   {
          //     path: '/super/addTeacher', 
          //     component: () => import('@/page/super/addTeacher/form.vue')
          //   },
          //   {
          //     path: '/super/addTeacher/file', 
          //     component: () => import('@/page/super/addTeacher/file.vue')
          //   }
          // ]
        },
        { 
          path: '/super/viewClass',
          component: () => import('@/page/super/viewClass/index.vue'),
        },
        { 
          path: '/super/addClass',
          component: () => import('@/page/super/addClass/index.vue'),
        },
        { 
          path: '/super/viewClass/:teacherId',
          component: () => import('@/page/super/viewClass/detail.vue'),
        },
        { 
          path: '/super/:teacherId', // 查看教师-详情
          component: () => import('@/page/super/viewTeacher/detail.vue'),
        },
      ]
    }
  ]
})
