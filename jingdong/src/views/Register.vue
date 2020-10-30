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
                            label:'注册'
                        },
                    ]
                },
            }
        },
        methods: {
            submitHandler(e) {
                e.preventDefault()
                // console.log('我注册了')
                // 请求注册的接口
                this.$http.get('/api/register',{params:this.model}).then(res=>{
                    console.log(res.message)
                    this.$router.replace({path:'/botnav/index'})

                }).catch(err=>{
                    console.log(err)
                })
            }
        },
    }
</script>

<style lang="stylus" scoped>
.headerimg{
    height 160px;
    widtd 100%;
}
</style>