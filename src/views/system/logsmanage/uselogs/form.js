export function tablecol(that) {
  return [
    

    {
      prop: "name",
      label: "流程名称",
      align: "left",
    },
    {
      prop: "createUserName",
      label: "创建人",
      align: "left",
    },
    {
      prop: "createTime",
      label: "创建时间",
      align: "left",
    },
    {
      prop: "usable",
      label: "是否可用",
      align: "center",
      render: (h, scope) => {
        return h("el-checkbox", {
          props: {
            value: scope.row.usable,
            disabled: "disabled",
          },
        });
      },
    },
    {
      prop: "remark",
      label: "备注",
    },
    {
      prop: "",
      label: "",
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
  ];
}
