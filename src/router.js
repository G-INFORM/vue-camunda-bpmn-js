import {createRouter, createWebHistory} from 'vue-router';

import TheGuide from "@/components/Guide/TheGuide";
import TheMain from "@/TheMain";
// import whatIsBPMN from "@/components/Guide/WhatIsBPMN";

const routes = [
    {
        path: "/guide",
        name: "guide",
        component: TheGuide,
    },
    {
        path: "/",
        name: "main",
        component: TheMain
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;