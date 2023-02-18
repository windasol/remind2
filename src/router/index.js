import { createWebHistory, createRouter } from "vue-router";
import Version1 from "@/components/Version-1.vue";
import Version2 from "@/components/Version-2.vue";
import Version3 from "@/components/Version-3.vue";

const routes = [
    {
        path: "/",
        name: "version1",
        component: Version1,
    },
    {
        path: "/version2",  // remind.vue로 이동할 Path
        name: "version2",  // router name
        component: Version2,  // Path로 이동될 Component
    },
    {
        path: "/version3",  // remind.vue로 이동할 Path
        name: "version3",  // router name
        component: Version3,  // Path로 이동될 Component
    },
];

const router = createRouter({
    base: process.env.BASE_URL,
    history: createWebHistory(),
    routes,
});

export default router;