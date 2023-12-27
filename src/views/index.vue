<template>
  <div>

    <el-button @click="jump">
      跳转子项目页面
    </el-button>

  </div>
</template>
<script>

export default {
  data() {

    return {
    
    }
  },
  methods: {
    jump(){
      this.$router.push('/sui/my-page')
    }

  },


  mounted() {
   
  }
}
</script>
