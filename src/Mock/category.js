const Mock = require('mockjs')
export default [
    {
        url: '/category',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: [
                    {
                        id: 1,
                        title: 'Vue',
                        href: '/category/vue'
                    },
                    {
                        id: 2,
                        title: 'JS',
                        href: '/category/Js'
                    },
                    {
                        id: 3,
                        title: 'Three.js',
                        href: '/category/Three'
                    },
                    {
                        id: 4,
                        title: '随笔',
                        href: '/category/live'
                    }
                ]
            }
        }
    }
]
