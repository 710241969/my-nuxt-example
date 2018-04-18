//@nuxtjs/proxy的引入有两种方式

//方式一：modules中引入'@nuxtjs/proxy'
// module.exports = {
//     modules: [
//         '@nuxtjs/axios',
//         '@nuxtjs/proxy'
//     ],
//     proxy: {
//         '/api': {
//             target: 'http://localhost:8088',
//             pathRewrite: { '^/api': '' },
//         }
//     },
//     dev: process.env.NODE_ENV !== 'production'
// }

//方式二：axios: {proxy: true},
module.exports = {
    modules: [
        '@nuxtjs/axios',
    ],
    axios: {
        proxy: true,

        // prefix: "/",
        // host: "localhost",
        // port: 8088,

        baseURL: 'http://localhost:8087',
    },
    proxy: {
        '/api': {
            target: 'http://localhost:8088',
            pathRewrite: {
                '^/api': ''
            }
        }
    },
    // dev: process.env.NODE_ENV !== 'production', // 通过npm启动
    dev: false // 如果直接通过node启动
}

