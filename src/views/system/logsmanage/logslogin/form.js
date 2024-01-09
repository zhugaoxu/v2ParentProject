import { h } from "vue";
export function tablecol(that) {
  return [
    {
      label: "姓名",
      prop: "name",
      align: "center",
    },
    {
      label: "年龄",
      prop: "age",
      align: "center",
    },
    {
      label: "地址",
      prop: "address",
      align: "center",
    },
    {
      label: "订单号",
      prop: "order",
      align: "center",
    },
    {
      label: "颜色",
      prop: "color",
      align: "center",
    },
    {
      label: "商品",
      prop: "shop",
      align: "center",
      render: (h, scope) => {
        return h("el-checkbox", {
          props: {
            value: true,
            disabled: true,
          },
        });
      },
    },
    {
      label: "类别",
      prop: "type",
      align: "center",
      render: (h, scope) => {
        return h("span", {}, scope.row.type);
      },
    },
  ];
}
export function searchA(that) {
  return [
    {
      key: "name",
      type: "input",
      label: "输入框",
    },
    {
      key: "testB",
      type: "date",
      label: "日期框",
      attrs: {
        placeholder: "请选择日期",
      },
    },
    {
      key: "faultClassId",
      type: "select",
      label: "下拉框",
      options: that.receiveType,
      optionLabel: "dictValue",
      optionValue: "id",
    },
  ];
}

export function formConfigShow(that) {
  let formItemList = [
    {
      key: "testA",
      type: "input",
      label: "输入框1",
      attrs: {
        placeholder: "请输入猪猪",
      },
    },
    {
      key: "faultClassId",
      type: "select",
      label: "故障类型",
      options: that.receiveType,
      optionLabel: "dictValue",
      optionValue: "id",
      rules: {
        required: true,
        message: "请选择故障类型",
      },
    },
    {
      key: "processRemark",
      type: "input",
      subtype: "textarea",
      label: "处理描述",
      attrs: {
        rows: 4,
        showWordLimit: true,
        maxlength: 200,
      },
    },
  ];
  return {
    inline: true,
    formItemList: formItemList,
    labelPosition: "left",
    labelWidth: "auto",
  };
}
export const tableDown = (that) => {
  let arr = [
    { type: "checkbox", width: 50 },
    {
      field: "nameZhu",
      title: "名称",
      editRender: {
        name: "$input",
        immediate: true,
      },
      slots: {
        default: ({ row, rowIndex }) => {
          return h(
            "div",
            { className: rowIndex == "3" ? "vxe-table-disabled" : "" },
            row.nameZhu
          );
        },
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
      className: "vxe-table-disabled"
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
      editRender:{ autofocus: ".el-input__inner" },
      slots:{
        edit: ({ row, rowIndex }) => {
          return (
              <el-date-picker
                  v-model={row['dateZ']}
                  type={"date"}
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
              ></el-date-picker>
          );
      },
      }

    },
    {
      field: "materZ",
      title: "物料",
    },
  ];
  return arr;
};
export const formsUp = (that) => {
  let arr = [
    {
      label: "类型名称1",
      key: "billTypeName1",
      type: "input",
      rules: {
        required: true,
        message: "请输入类型名称1",
      },
      attrs: {},
    },
    {
      label: "类型编号6",
      key: "billTypeNo6",
      type: "select",
      options: [
        { lable: "猪猪", value: "zhuzhu" },
        { lable: "芬芬", value: "fenfen" },
      ],
      optionValue: "value",
      optionLabel: "lable",
    },
    {
      label: "类型名称2",
      key: "billTypeName2",
      type: "input",
      rules: {
        required: true,
        message: "请输入类型名称2",
      },
      attrs: {},
    },
    {
      label: "类型编号5",
      key: "billTypeNo5",
      type: "select",
      options: [
        { lable: "猪猪", value: "zhuzhu" },
        { lable: "芬芬", value: "fenfen" },
      ],
      optionValue: "value",
      optionLabel: "lable",
    },
    {
      label: "类型名称3",
      key: "billTypeName3",
      type: "input",
      rules: {
        required: true,
        message: "请输入类型名称3",
      },
      attrs: {},
    },
    {
      label: "类型编号4",
      key: "billTypeNo4",
      type: "select",
      options: that.userList,
      optionValue: "value",
      optionLabel: "lable",
    },
  ];

  return arr;
};
