<template>
    <div>
        <!-- 页面滑动的效果 -->
        <transition :name="transitionName">
            <router-view class="Router"></router-view>
        </transition>
        
        <!-- 底部导航栏 -->
        <cube-tab-bar
            v-model='selectedLabelDefault'
            class="botnav"
            :data='tabs'
            @click="clickHandler"
            @change="changeHandler">
        </cube-tab-bar>
        <span class="countsum">{{countsum}}</span>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
    export default {
        data(){
            return{
                // 初始化为左往右滑动
                transitionName:'slide-right',
                // 默认选择
                selectedLabelDefault:'首页',
                tabs:[{
                    label:'首页',
                    icon:'cubeic-home'
                },
                {
                    label:'分类',
                    icon:'cubeic-tag'
                },
                {
                    label:'搜索',
                    icon:'cubeic-search'
                },
                {
                    label:'购物车',
                    icon:'cubeic-mall'
                },
                {
                    label:'我的',
                    icon:'cubeic-person'
                }
                ]
            }
        },
// 获取购物车的总数
        computed:{
            ...mapGetters({
                // 可以只写一个countsum
                countsum:'countsum'
            })
        },

        methods: {
            clickHandler(label) {
                console.log(label)
            },

            // 点击与自身不同的其他导航
            changeHandler(label){
                switch(label){
                    case '首页':
                        this.$router.push({path:'/botnav/index'});
                        break;
                    case '分类':
                        this.$router.push({path:'/botnav/list'});
                        break;
                    case '搜索':
                        this.$router.push({path:'/botnav/search'});
                        break;
                    case '购物车':
                        this.$router.push({path:'/botnav/cart'});
                        break;
                    case '我的':
                        this.$router.push({path:'/botnav/mine'});
                        break;
                }
            }
        },
        created(){
            switch(this.$route.path){
                case '/botnav/index':
                    this.selectedLabelDefault='首页';
                    break;
                case '/botnav/list':
                    this.selectedLabelDefault='分类';
                    break;
                case '/botnav/search':
                    this.selectedLabelDefault='搜索';
                    break;
                case '/botnav/cart':
                    this.selectedLabelDefault='购物车';
                    break;
                case '/botnav/mine':
                    this.selectedLabelDefault='我的';
                    break;
            }
        }
    }
</script>

<style lang="stylus">
     .cube-tab-bar.botnav
        position  fixed
        bottom  0
        left 0
        z-index 1000
        width 100%
        background #fff
        .cube-tab div
            font-size 16px
            padding-top 3px
        i
            font-size 20px
    .Router
        position absolute
        width 100%
        transition all 0.8s ease
    .slide-left-enter,.slide-right-leave-active
        opacity 0
        -webkit-transform translate(100%,0)
    .slide-left-leave-avtive,.slide-right-enter
        opacity 0
        -webkit-transform translate(0,100%)
    .countsum
        position fixed
        bottom 33px
        right 23%
        z-index 1001
        width 18px
        height 18px
        line-height 18px
        border-radius 50%
        font-size 14px
        background red
        color #fff
</style>