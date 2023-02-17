import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import remind1 from "@/components/remind1.vue";
import MusicCal from "@/components/MusicCal.vue";

const routes = [
    {
        path: "/",
        name: "version1",
        component: HelloWorld,
    },
    {
        path: "/version2",  // remind.vue로 이동할 Path
        name: "version2",  // router name
        component: remind1,  // Path로 이동될 Component
    },
    {
        path: "/version3",  // remind.vue로 이동할 Path
        name: "version3",  // router name
        component: MusicCal,  // Path로 이동될 Component
    },
];

const router = createRouter({
    base: process.env.BASE_URL,
    history: createWebHistory(),
    routes,
});

export default router;