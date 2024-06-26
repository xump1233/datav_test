import VueRouter from "vue-router";

import GraphicBox1 from '../components/GraphicBox'
import GraphicBox2 from '../components/GraphicBox2'
import GraphicBox3 from '../components/GraphicBox3'

const router = new VueRouter({
    routes:[
        {
            path: '/',
            redirect: {
                name: 'chapter1', // 重定向到名为 'chapter1' 的路由
                query: {
                    title: '毕业生就业基本情况',
                    position: 'column'
                }
            }
        },        
        {
            name:'chapter1',
            path:'/part1',
            component:GraphicBox1,
            props(route){
                return {
                    title:route.query.title,
                    position:route.query.position
                }
            } 
        },
        {
            name:'chapter2',
            path:'/part2',
            component:GraphicBox2,
            props(route){
                return {
                    title:route.query.title,
                    position:route.query.position
                }
            } 
        },
        {
            name:'chapter3',
            path:'/part3',
            component:GraphicBox3,
            props(route){
                return {
                    title:route.query.title,
                    position:route.query.position
                }
            } 
        }
    ]
})


export default router