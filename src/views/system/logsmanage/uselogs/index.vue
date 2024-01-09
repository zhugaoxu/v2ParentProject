<template>
  <div>
    <div class="mainContain">
      <el-card class="mainCardPage">
        <div class="setFlexB">
          <fen-search
            :searchArr="searchArr"
            @searchMethod="searchMethod"
            :isShowReset="true"
          />
          <div>
            <el-button-group>     
              <el-button @click="()=>this.openModal=true"> 设计 </el-button>
            </el-button-group>
          </div>
        </div>
        <div ref="suixin" class="setTableStyle">
          <fen-table
            v-if="tableAttrs.height"
            :tableColumn="tableColumn"
            :tableData="tableData"
            :tableAttrs="tableAttrs"
            :isSelection="true"
            :tableMethods="tableMethods"
         
          />
        </div>
      </el-card>
    </div>
   <div v-if="openModal" class="commonDialog">
    <el-dialog title="设计" :visible="openModal" width="90%" @close="()=>this.openModal=false" >
          <detail-flow :seleData="selectRow" :visible.sync="openModal" @updateTable="searchMethod"  />
        
        </el-dialog>
   </div>
  </div>
</template>

<script>
import { tablecol, searchA ,formConfigShow} from "./form";
import axios from "axios";
import DetailFlow from './detail/index.vue'
export default {
  components:{
    DetailFlow
  },
  data() {
    return {
      selectRow:{},

      height: 0,
      tableData: [],
      tableColumn: tablecol(this),
      tableAttrs: {
        border: true,
        "row-key": "id",
        height: 0,
      },
      tableMethods: {
        "selection-change": (value) => {
          // 选中事件的值
          this.selectRow=value.length?value[0]:{}
        },
      },
    
      openModal:false,
     
    };
  },

  mounted() {
    let that=this;
  
    // 外层设置下表格的高度  当前表格标签具体浏览器最上的高度
    let { top = 0 } = this.$refs.suixin.getBoundingClientRect();
    let trueHeight = window.innerHeight - top;
    this.tableAttrs.height = trueHeight > 200 ? trueHeight - 70 : 200;
    axios.get('/zhu.json').then(res=>{
      console.log(res)
      that.tableData=res.data.data.records
    })
  },
  computed: {
    searchArr() {
      return searchA(this);
    },

  },
  methods: {
    searchMethod(value) {
      console.log(value)
    },

  },
};
</script>
<style scoped lang="less" src="./index.less"></style>
