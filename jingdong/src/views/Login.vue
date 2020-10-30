<template>
    <div>
        <img class="headerimg" src="https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png" alt="">
        <cube-form 
        :model="model"
        :schema="schema"
        @submit="submitHandler">
        <!-- 数据源  里面的配置 -->
        </cube-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                model:{
                    username:'',
                    password:''
                },
                schema:{
                    // 配置
                    fields:[
                        // 用户名配置
                        {
                            type:'input',
                            modelKey:'username',
                            label:'用户名',
                            props:{
                                // 提示
                                placeholder:'请输入用户名'
                            },
                            rules:{
                                // 校验规则
                                required:true,
                                type:'string',
                                min:3,
                                max:15
                            },
                            // 失焦的时候校验规则
                            trigger:'blur',
                            messages:{
                                // 校验规则的提示信息
                                required:'用户名不能为空',
                                min:'用户名不能小于三个字符。',
                                max:'用户名不能大于十五个字符。'
                            },
                        },
                        // 密码配置
                        {
                            type:'input',
                            modelKey:'password',
                            label:'密码',
                            props:{
                                placeholder:'请输入密码',
                                type:'password',
                                eye:{
                                    open:false,
                                }
                            },
                            rules:{
                                required:true
                            },
                            trigger:'blur',
                        },
                        {
                            type:'submit',
                            label:'登录'
                        },
                    ]
                },
            }
        },
        methods: {
            // async await是ES7的写法(配套使用)，用同步的写法写异步调用
            async submitHandler(e) {
                e.preventDefault()
                try{
                    const result=await this.$http.get('/api/login',{params:this.model})
                    if(result.code=='0'){
                        // alert(result.data.message)
                        // 调用vuex的mutations方法存储token,commit是调用mutations的方法  
                        this.$store.commit('settoken',result.token)
                        // 存到本地存储
                        window.localStorage.setItem('token',result.token)
                        this.$router.replace({path:'/botnav/index'})

                        // 判断路由是否带参，带参就去到重定向参数地址，否则就去到首页
                        if(this.$route.query.redirect){
                            this.$router.replace({path:this.$route.query.redirect})
                        }else{
                            this.$router.replace({path:'/botnav/index'})
                        }
                    }else{
                        alert(result.message)
                    }
                }catch(err){
                    console.log(err)
                }
            }
        },
    }
</script>

<style lang="stylus" scoped>
.headerimg
    height 160px;
    widtd 100%;
</style>