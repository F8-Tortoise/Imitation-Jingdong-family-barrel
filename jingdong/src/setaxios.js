// 请求拦截的文件
import axios from 'axios'
import store from './store'
import router from './router'

// http全局拦截
// token要放在请求的header上面带回去给后端

// export default将写的方法暴露出去
export default function setAxios() {
    // 请求拦截（写法固定）
    axios.interceptors.request.use(
        config => {
            // 如果有token 就直接获得token并返回
            if (store.state.token) {
                config.headers.token = store.state.token
            }
            return config
        }
    )

    // （登录过期的操作）每次的请求有返回的，都是先经过这个拦截器
    axios.interceptors.response.use(
        response => {
            // 判断是否请求成功 状态码status=200即请求成功
            if (response.status == 200) {
                const data = response.data
                if (data.code == -1) {
                    // code=-1默认为登录过期，需要重新登录，得清空vuex的token和localStorage的token
                    store.commit('settoken', '')
                    localStorage.removeItem('token')
                        // 跳转到login页面
                    router.replace({ path: '/login' })
                }
                return data
            }
            return response
        }
    )
}