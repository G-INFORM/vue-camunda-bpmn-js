import {createRouter, createWebHistory} from 'vue-router';

import TheGuide from "@/components/Guide/TheGuide";
import TheMain from "@/TheMain";
import BPInfo from "@/components/Input-Output-Info/BPInfo";
import DescriptionBP from "@/components/Guide/DescriptionBP";
import RulesBP from "@/components/Guide/RulesBP";

const routes = [
    {
        path: "/guide",
        name: "guide",
        component: TheGuide,
        children: [
            {
                path: "bp-info",
                name: "infoBP",
                component: BPInfo
            },
            {
                path: "bp-description",
                name: 'descriptionBP',
                component: DescriptionBP
            },
            {
                path: 'bp-rules',
                name: 'rulesBP',
                component: RulesBP
            }
        ]
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