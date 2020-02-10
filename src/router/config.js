import { AuthLayout, AuthBlankLayout, DefaultLayout, AdminLayout, AdminWithoutDrawerLayout } from "@/components/layouts"

export const publicRoute = [
  { path: "*", component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue") },
  {
    path: "/admin/auth",
    component: AuthLayout,
    name: "AdminAuth",
    meta: { title: "Login" },
    redirect: "/admin/auth/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "adminLogin",
        meta: { title: "Login" },
        component: () => import(/* webpackChunkName: "login" */ "@/views/admin/Login.vue")
      }
    ]
  },

  {
    path: "/account",
    component: AuthBlankLayout,
    name: "Account",
    meta: { title: "Account" },
    redirect: "/account/details",
    hidden: true,
    children: [
      {
        path: "details",
        name: "AccountDetails",
        meta: { title: "Account" },
        component: () => import(/* webpackChunkName: "login" */"@/views/Account.vue")
      },
    ]
  },

  {
    path: "/auth",
    component: AuthLayout,
    name: "Auth",
    meta: { title: "Login" },
    redirect: "/auth/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        meta: { title: "Login" },
        component: () => import("@/views/Login.vue")
      },
      {
        path: "signup",
        name: "signup",
        meta: { title: "Signup" },
        component: () => import("@/views/Signup.vue")
      },
      {
        path: "forgot",
        name: "forgot",
        meta: { title: "Forgot password" },
        component: () => import("@/views/Forgot.vue")
      },
      {
        path: "resetPassword",
        name: "resetPassword",
        meta: { title: "Reset password" },
        component: () => import("@/views/ResetPassword.vue"),
        props: (r) => ({
          token: r.query.token
        })
        /* http://domain/resetPassword?token=fromemail */
      }
    ]
  },

  {
    path: "/admin",
    component: AdminLayout,
    name: "Admin",
    redirect: "/admin/dashboard",
    hidden: true,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "dashboard",
        name: "DashboardAdmin",
        component: () => import("@/views/admin/Dashboard.vue")
      },
      {
        path: "account",
        name: "UserAccount",
        component: () => import("@/views/admin/UserAccount.vue")
      }
    ]
  },

  {
    path: "/users",
    name: "Users",
    component: AdminWithoutDrawerLayout,
    redirect: "/users/manage",
    hidden: true,
    children: [
      {
        path: "manage",
        name: "ManageUsers",
        meta: { title: "Manage Users & Groups", requiresAuth: true },
        component: () => import("@/views/admin/Users.vue")
      },
      {
        path: "account",
        name: "AdminAccount",
        meta: { title: "Account", requiresAuth: true },
        component: () => import("@/views/admin/Account.vue")
      },
      
    ]
  },

  {
    path: "/404",
    name: "404",
    meta: { title: "Not Found" },
    component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
  },

  {
    path: "/500",
    name: "500",
    meta: { title: "Server Error" },
    component: () => import(/* webpackChunkName: "errors-500" */ "@/views/error/Error.vue")
  },

  {
    path: "EnergyHealth_shop",
    name: "EnergyHealth_shop",
    redirect: "http://example.com"
  },

]

export const protectedRoute = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { title: "Home", group: "apps", icon: "" },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: { title: "Dashboard", group: "apps", icon: "dashboard", requiresAuth: true },
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
      },

      {
        path: "/403",
        name: "Forbidden",
        meta: { title: "Access Denied", hiddenInMenu: true, requiresAuth: true },
        component: () => import(/* webpackChunkName: "error-403" */ "@/views/error/Deny.vue")
      },

      {
        path: "/recovery",
        name: "Recovery",
        component: () => import(`@/views/Recovery.vue`),
        meta: { title: "Recovery", icon: "filter_vintage", requiresAuth: true }
      },

      {
        path: "/diagnostic",
        name: "Diagnostic",
        component: () => import(`@/views/Diagnostic.vue`),
        meta: { title: "Diagnostic", icon: "healing", requiresAuth: true }
      },

      {
        path: "/symptom_checklist",
        name: "Symptom Checklist",
        component: () => import(`@/views/SymptomChecklist.vue`),
        meta: { title: "Symptom Checklist", icon: "checklist", requiresAuth: true }
      },

      {
        path: "/decision_profile",
        name: "Decision Profile",
        component: () => import(`@/views/Decision.vue`),
        meta: { title: "Decision Profile", icon: "favourite", requiresAuth: true }
      },

      {
        path: "/summary",
        name: "Summary",
        component: () => import(`@/views/Summary.vue`),
        meta: { title: "Summary", icon: "table", requiresAuth: true }
      },

      {
        path: "/stress_recovery",
        name: "StressRecovery",
        component: () => import(`@/views/StressRecovery.vue`),
        meta: { title: "Stress Recovery Diagnostic", icon: "checklist", requiresAuth: true }
      },
        
      {
        path: "/account",
        name: "Account",
        component: () => import(`@/views/Account.vue`),
        meta: { title: "Profile", requiresAuth: true }
      },      

      {
        path: "terms-and-conditions",
        name: "TermsConditions",
        meta: { title: "Terms & Conditions", requiresAuth: true },
        component: () => import("@/views/TermsConditions.vue")
      },
      {
        path: "privacy-policy",
        name: "PrivacyPolicy",
        meta: { title: "Privacy Policy", requiresAuth: true },
        component: () => import("@/views/PrivacyPolicy.vue")
      },
    ]
  }
    
  

]
