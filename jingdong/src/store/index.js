import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
        // 变量存储库
        state: {
            token: '',
            cartarry: JSON.parse(localStorage.getItem('cartarry')) || [],
            //存储购物车商品的数组，如果本地存储有数据就直接拿，没有就是空数组
        },
        // 同步存储，写方法
        mutations: {
            // 设置vuex的token
            settoken(state, token) {
                state.token = token
            },
            // 添加商品到购物车
            tocart(state, tag) {
                let goods = state.cartarry.find(v => v.title == tag.label)
                if (goods) {
                    goods.cartCount += 1
                } else {
                    state.cartarry.push({ title: tag.label, cartCount: 1 })
                }
            },
            // 购物车数量加1
            cartadd(state, index) {
                state.cartarry[index].cartCount++
            },
            // 购物车数量减1
            cartremove(state, index) {
                if (state.cartarry[index].cartCount > 1) {
                    state.cartarry[index].cartCount--
                } else {
                    if (window.confirm('确定从购物车移出商品吗？')) {
                        state.cartarry.splice(index, 1)
                    }
                }
            },
            // 清空购物车
            cartclear(state) {
                state.cartarry = []
            }
        },
        // 异步存储
        actions: {},
        modules: {},
        // 相当于vue的计算属性
        getters: {
            // 计算购物车商品的总数
            countsum: state => {
                let num = 0
                state.cartarry.forEach(v => {
                    num += v.cartCount
                })
                return num
            }
        }
    })
    // 监听每次条用mutations的时候，都会进到这个方法，我们可以做一些自己想做的处理
store.subscribe((mutations, state) => {
    // 将购物车数据存到本地存储
    localStorage.setItem('cartarry', JSON.stringify(state.cartarry))
})
export default store