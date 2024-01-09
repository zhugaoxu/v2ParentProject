<template>
  <div>
    <el-form label-width="80px" :model="formData">
      <el-form-item label="菜单名称">
        <el-select v-model="formData.menuId" @change="(value) => resetMenuNews(value)" placeholder="请选择">
          <el-option v-for="item in sysList" :key="item.id" :label="item.label" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
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
    const { properties, text } = this.$props.nodeData
    if (properties) {
      this.$data.formData = Object.assign({}, this.$data.formData, properties)
    }

    if (text && text.value) {
      this.$data.formData.text = text.value
    }
    if (text && text.value) {
      this.$data.text = text.value
    }
  },
  data() {
    return {

      sysList: [
        {
          label: '基础档案',
          id: '25A4B450-88CB-406A-95CC-9883B63787C4',
          picName: '基础档案',
        },
        {
          label: '销售管理',
          id: 'A7923FB6-FF57-4FBC-9221-9ABC3312C87F',
          picName: '销售管理',
        },
        {
          label: '计划管理',
          id: 'E2D2F037-66E8-40AA-B272-AFA5832A1708',
          picName: '发票管理',
        },
        {
          label: '采购管理',
          id: 'DF5ABB8F-BFAA-4B36-B04B-2250BAC1FD7E',
          picName: '采购管理',
        },

        {
          label: '委外管理',
          id: '23D39B89-3E41-4787-8234-0A0F437CD06F',
          picName: '委外管理',
        },
        {
          label: '质量管理',
          id: '1C43FFC7-F87C-4C47-A051-8107CE965AD5',
          picName: '待检仓库',
        },
        {
          label: '仓储管理',
          id: 'F6E38E21-704F-39DB-D8BA-160E029694B6',
          picName: '半成品仓',
        },
        {
          label: '财务管理',
          id: 'B3D0ADE3-472C-E72B-6FF8-1CBE634E6387',
          picName: "现金管理",
        },
        {
          label: "系统管理",
          id: '26D8B9E3-59C1-476F-9D04-009BC53508BA',
          picName: '系统管理',
        },
        {
          label: '开发测试',
          id: '48DEAC04-FF0D-4BEB-A36A-9EA19250C879',
          picName: '开发测试',
        },
        {
          label: '协同管理',
          id: '8F732B08-A735-5D51-FF16-7621039F04DB',
          picName: '仓库权限维护',
        }
      ],




      text: '',
      formData: {
        text:'',
        menuId:'',
        menuIcon:''
      }
    }


  },
  methods: {
    resetMenuNews(e){
      let obj=this.sysList.find(item=>item.id==e);
      this.formData.menuId=e;
      this.formData.menuIcon=obj.picName;
      this.formData.text=obj.label;
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
