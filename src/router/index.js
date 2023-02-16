import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import remind1 from "@/components/remind1.vue";

const routes = [
    {
        path: "/",
        name: "HelloWorld",
        component: HelloWorld,
    },
    {
        path: "/change",  // remind.vue로 이동할 Path
        name: "change",  // router name
        component: remind1,  // Path로 이동될 Component
    },
];

const router = createRouter({
    base: process.env.BASE_URL,
    history: createWebHistory(),
    routes,
});

export default router;