<template>
  <div class="AddBigModal">
    <el-dialog
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      :align-center="true"
      @close="close"
    >
      <template #title>
        <div class="resetDiaLogTitle">
          <div>
            {{ title }}
          </div>
          <div>
            <i
              class="el-icon-close"
              style="font-size: 22px"
              @click="() => close()"
            />
          </div>
        </div>
      </template>

      <div>
        <div class="collapseLine">
          <div class="leftIcon">
            <i
              class="el-icon-arrow-down"
              @click="
                () => {
                  collapseObj.hideBasic = true;
                }
              "
              v-if="!collapseObj.hideBasic"
            ></i>
            <i
              class="el-icon-arrow-right"
              @click="collapseObj.hideBasic = false"
              v-else
            ></i>
          </div>
          <div>基本信息</div>
        </div>
        <div
          class="formParent"
          :style="
            collapseObj.hideBasic
              ? { height: '0px', padding: 0, marginBottom: '10px' }
              : {}
          "
        >
          <fen-form v-model="queryForm" :formConfig="formConfig" ref="submit" />
        </div>
      </div>
      <div>
        <div class="collapseLine">
          <div class="leftIcon">
            <i
              class="el-icon-arrow-down"
              @click="
                () => {
                  collapseObj.hideDetail = true;
                }
              "
              v-if="!collapseObj.hideDetail"
            ></i>
            <i
              class="el-icon-arrow-right"
              @click="collapseObj.hideDetail = false"
              v-else
            ></i>
          </div>
          <div>明细信息</div>
          <div>
            <el-button-group>
              <el-button @click="addTableOne"> 新增 </el-button>
              <el-button @click="copyTable"> 复制 </el-button>
              <el-button @click="deleteTable"> 删除 </el-button>
            </el-button-group>
          </div>
        </div>
        <div
          ref="suixinx"
          :style="{
            height: collapseObj.hideDetail ? '0px' : '',
            overflow: 'hidden',
          }"
        >
          <div :style="{ height: this.height + 'px' }" class="showTable">
            <vxe-grid
              ref="xGrid"
              v-bind="gridOptions"
              keep-source
              :data="this.tableData"
              @checkbox-change="checkboxChange"
              @checkbox-all="checkboxChange"
            >
            </vxe-grid>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="() => close()">取消</el-button>
          <el-button @click="() => submit()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { formsUp } from "./form";
import { submitDia, copyList } from "./method";
export default {
  props: {
    // 传过来的数据
    editData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 设置的标题
    title: {
      type: String,
      default: "新增",
    },
  },
  data() {
    return {
      height: 200, //下面表格的高度
      dialogVisible: true, //是否展示弹框
      tableData: [], //表格展示的数据
      collapseObj: {
        hideDetail: false, //是否折起主表
        hideBasic: false, //是否折起明细表
      },
      selectionData: [], //选中行
      queryForm: {}, //主表表单数据
      userList: [{ lable: "滴答滴答", value: "123" }], //用户列表
    };
  },
  computed: {
    /**
     * @desc 主表的配置信息
     */
    formConfig() {
      return {
        inline: true,
        size: "mini",
        labelWidth: "100px",
        formItemList: formsUp(this),
      };
    },
    /**
     * @desc vxe表格的配置信息
     */
    gridOptions() {
      return {
        border: true,
        round: true,
        height: "100%",
        editConfig: {
          trigger: "click",
          mode: "cell",
          showIcon: false,
        },
        columns: [
          { type: "checkbox", width: 50 },
          {
            field: "nameZhu",
            title: "名称",
            editRender: {
              name: "$input",
              immediate: true,
            },
          },
          {
            field: "nickname",
            title: "昵称",
            className: "vxe-table-disabled",
          },

          {
            field: "role",
            title: "地址",
            className: "vxe-table-disabled",
          },
          {
            field: "processMode",
            title: "加工工艺",
            editRender: {
              name: "$input",
              immediate: true,
            },
          },
          {
            field: "dateZ",
            title: "选择时间",
            editRender: { autofocus: ".el-input__inner" },
            slots: {
              edit: ({ row }) => {
                return (
                  <el-date-picker
                    v-model={row["dateZ"]}
                    type={"date"}
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                );
              },
            },
          },
          {
            field: "materZ",
            title: "物料",
          },
        ],
        editRules: {
          materialNo: [
            { required: true, message: "请选择物料", trigger: "blur" },
          ],
          processMode: [
            { required: true, message: "请选择加工工艺", trigger: "blur" },
          ],
        },
        validConfig: {
          autoPos: false,
          showMessage: true,
        },
      };
    },
  },

  methods: {
    /**
     * @desc 关闭当前弹框
     */
    close() {
      this.dialogVisible = false;
      setTimeout(() => {
        this.$emit("update:visible", false);
      }, 300);
    },

    /**
     * @desc 复选框的选中
     */
    checkboxChange(value) {
      this.selectionData = value.records;
    },

    /**
     * @desc 新增明细行
     */
    addTableOne() {
      let obj = { processMode: "", dateZ: "2020-09-01", materZ: "suu" }; //是否需要默认赋值
      this.$refs.xGrid.insertAt(obj, -1);
    },

    /**
     * @desc 复制明细行操作
     */
    copyTable() {
      copyList(this);
    },

    /**
     * @desc 删除明细行
     */
    deleteTable() {
      this.$refs.xGrid.removeCheckboxRow();
      this.selectionData = [];
    },

    /**
     * @desc 表单提交进行的操作
     */
    submit() {
      submitDia(this);
    },
  },
  /**
   * @desc 初始化页面设置表格高度
   */
  mounted() {
    setTimeout(() => {
      let { top = 0 } = this.$refs.suixinx.getBoundingClientRect();
      this.height = window.innerHeight - top - 120;
    }, 100);
  },
};
</script>
<style scoped lang="less" src="./edit.less"></style>
