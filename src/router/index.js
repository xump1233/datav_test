import VueRouter from "vue-router";

import GraphicBox from '../components/GraphicBox'

const router = new VueRouter({
    routes:[
        {
            name:'chapter1',
            path:'/part1',
            component:GraphicBox,
            props(route){
                return {
                    title:route.query.title
                }
            } 
        },
        {
            name:'chapter2',
            path:'/part2',
            component:GraphicBox,
            props(route){
                return {
                    title:route.query.title
                }
            } 
        },
        {
            name:'chapter3',
            path:'/part3',
            component:GraphicBox,
            props(route){
                return {
                    title:route.query.title
                }
            } 
        }
    ]
})


export default router