<template>
  <div style="margin-top: 50px;margin-left: 10px;">
    <el-form label-width="80px" :model="formData">
      <el-form-item label="菜单名称"  v-if="isMenu">
        <el-select v-model="formData.menuId"  filterable style="width:260px"  @change="(value) => resetMenuNews(value)" placeholder="请选择">
          <el-option v-for="item in sysList" :key="item.id" :label="item.label" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" v-if="isMenu">
        <el-input  style="width:260px" :maxlength="6"  placeholder="请输入内容" v-model="formData.text">
        </el-input>
      </el-form-item>
      <el-form-item label="文本内容" v-if="!isMenu">
        <el-input type="textarea" style="width:360px" :rows="2" placeholder="请输入内容" v-model="formData.text">
        </el-input>
      </el-form-item>




      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    nodeData: Object,
    lf: Object || String,
  },
  mounted() {
    const { properties, text, type = '' } = this.$props.nodeData
    if (properties) {
      this.$data.formData = Object.assign({}, this.$data.formData, properties)
    }

    if (text && text.value) {
      this.$data.formData.text = text.value
    }
    if (text && text.value) {
      this.$data.text = text.value
    }

  
    if (type == "registDefault" || type=='registLing') {
      delete this.formData.menuId
      delete this.formData.menuIcon;

      this.isMenu = false
    }


    this.sysList=this.$store.state.user.onecengroute.map(item=>{
      let {id,label,menuIcon}=item;
      return {
        id,
        label,
        picName: menuIcon
      }
    })
  },
  data() {
    return {

      isMenu: true,

      sysList: [],
      text: '',
      formData: {
        text: '',
        menuId: '',
        menuIcon: ''
      }
    }


  },
  methods: {
    resetMenuNews(e) {
      let obj = this.sysList.find(item => item.id == e);
      this.formData.menuId = e;
      this.formData.menuIcon = obj.picName;
      this.formData.text = obj.label;
    },

    onSubmit() {
      const { id } = this.$props.nodeData
      this.$props.lf.setProperties(id, {
        ...this.$data.formData
      });
      console.log(6666, this.$data.formData);
      this.$props.lf.updateText(id, this.$data.formData.text);
      this.$emit('onClose')
    },
  }
}
</script>
<style scoped></style>
