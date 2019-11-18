import { AuthLayout, DefaultLayout, AdminLayout, AdminWithoutDrawerLayout } from "@/components/layouts"

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
        component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue")
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
        path: "messages",
        name: "CoachingFeedbackAdmin",
        component: () => import("@/views/admin/CoachingFeedback.vue")
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
        path: "terms-and-conditions",
        name: "TermsConditions",
        meta: { title: "Terms & Conditions", requiresAuth: true },
        component: () => import("@/views/admin/TermsConditions.vue")
      },
      {
        path: "privacy-policy",
        name: "PrivacyPolicy",
        meta: { title: "Privacy Policy", requiresAuth: true },
        component: () => import("@/views/admin/PrivacyPolicy.vue")
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
        path: "/daily_data_weight",
        name: "Daily Data - Weight",
        component: () => import(`@/views/DailyDataWeight.vue`),
        meta: { title: "Daily Input - Weight", icon: "calendar_today", requiresAuth: true }
      },

      {
        path: "/daily_data_temp_pulse",
        name: "Daily Data - Temp & Pulse",
        component: () => import(`@/views/DailyDataTempPulse.vue`),
        meta: { title: "Daily Input - Temp & Pulse", icon: "favorite", requiresAuth: true }
      },

      {
        path: "/weekly_data",
        name: "Weekly Data",
        component: () => import(`@/views/WeeklyData.vue`),
        meta: { title: "Weekly Input", icon: "show_chart", requiresAuth: true }
      },

      {
        path: "/recipe_builder",
        name: "Recipe Builder",
        component: () => import(`@/views/RecipeBuilder.vue`),
        meta: { title: "Recipe Builder", icon: "restaurant", requiresAuth: true }
      },

      {
        path: "/diet_history",
        name: "Diet History",
        component: () => import(`@/views/DietHistory.vue`),
        meta: { title: "Diet History", icon: "bar_chart", requiresAuth: true }
      },

      {
        path: "/food_tracker",
        name: "Food Tracker",
        component: () => import(`@/views/FoodTracker.vue`),
        meta: { title: "Food Tracker", icon: "track_changes", requiresAuth: true }
      },

      {
        path: "/coaching_feedback",
        name: "Coaching Feedback",
        component: () => import(`@/views/CoachingFeedback.vue`),
        meta: { title: "Coaching Feedback", icon: "chat", requiresAuth: true }
      },
        
      {
        path: "/account",
        name: "Account",
        component: () => import(`@/views/Account.vue`),
        meta: { title: "Account", requiresAuth: true }
      },      
    ]
  }
    
  

]
