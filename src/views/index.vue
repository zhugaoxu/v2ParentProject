
<template>
  <div class="setLayoutBack">
    <fen-layout
      ref="zhuzhu"
      :parentLayout="parentLayout"
      @updateGrid="updateGrid"
      :isShowDefault="true"
      v-if="isDesignShow"
    >
      <template #FenFen="{item}">
        <div v-if="item.type == 'img'" style="height: 100%;">
          <el-card style="height: 100%;">
            <img :src="item.url" style="width: 100%;height: 100%;" />
          </el-card>
        </div>
        <div v-if="item.type == 'table'" style="height: 100%;">
          <el-card style="height: 100%;">
            <div class="setTableStyle">
              <fen-table
                :tableColumn="item.tableColumn"
                :tableData="item.tableData"
                :tableAttrs="{border:true}"
              />
            </div>
          </el-card>
        </div>
      </template>
    </fen-layout>
  </div>
</template>
<script>

export default {
  data() {
    return {
      isDesignShow: false,
      parentLayout: [
        {
          id: 123,
          type: "img",
          url:
            "https://img2.baidu.com/it/u=1429983984,4047616801&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
        },
        {
          id: 1323,
          type: "img",
          url:
          "https://img1.baidu.com/it/u=4140266763,2338414580&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=749"
        },
        {
          id: 1423,
          type: "img",
          url: "https://img2.baidu.com/it/u=2244294197,816069019&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        },
        {
          id: 1523,
          type: "img",
          url:
          "https://img0.baidu.com/it/u=3046687493,3922087994&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667",
        },
        {
          id: 200,
          type: "table",
          tableData: [
            { zhu: "随心", fen: "傻瓜" },
            { zhu: "开始", fen: "傻瓜" },
            { zhu: "随心", fen: "傻瓜" },
            { zhu: "开始", fen: "傻瓜" },
          ],
          tableColumn: [
            {
              label: "猪猪",
              id: 10,
              prop: "zhu",
              align: "center",
            },
            {
              label: "芬芬",
              id: 101,
              prop: "fen",
              align: "center",
            },

          ],
        },
      ],
    };
  },
  mounted() {
    // 没有接口  先缓存本地测试
    if (localStorage.getItem("ownLayout")) {
      this.parentLayout = JSON.parse(localStorage["ownLayout"]);
      this.isDesignShow = true;
    } else {
      this.isDesignShow = true;
    }
  },
  methods: {
    // 在这里可以将数据 发送后端存储到数据库里面
    updateGrid(value) {
     
      this.parentLayout =JSON.parse(JSON.stringify(value))
      localStorage.removeItem("ownLayout");
      localStorage.setItem("ownLayout", JSON.stringify(value));
    },
  },
};
</script>