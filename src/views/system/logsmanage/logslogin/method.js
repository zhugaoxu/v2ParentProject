export function initData(that) {
  let { currentPage, pageSize } = that.paginationObj;
  let arr = [];
  for (let i = 0; i < that.paginationObj.pageSize; i++) {
    let obj = { id: i + 11 };
    that.tableColumn.map((item) => {
      obj[item.prop] = "猪猪" + (i + 1 + (currentPage - 1) * pageSize);
    });
    arr.push(obj);
  }
  that.tableData = arr;
}
export function searchMethod(that, value) {
  that.initData = value;
  let { age = "", name = "" } = value;
  that.initTableData();
  that.tableData = that.tableData.filter(
    (item) => item.age.indexOf(age) > -1 && item.name.indexOf(name) > -1
  );
}
export async function submitDia(that) {
  let bool = that.$refs.submit.submitShowForm();
  let checkTableOne = false;
  let { tableData } = that.$refs.xGrid.getTableData();
  tableData = tableData.map((item, index) => {
    item.zgxIndex = index + 1;
    return item;
  });
  if (!bool) {
    return;
  }
  await that.$refs.xGrid
    .validate(tableData)
    .catch((errMap) => errMap)
    .then((errMap) => {
      if (errMap) {
        const { rule, row } = errMap[Object.keys(errMap)[0]][0];
        const { $options } = rule;
        that.$message.error(
          "第" + row.zgxIndex + "行数据有误：" + $options.message
        );
        checkTableOne = false;
      } else {
        checkTableOne = true;
      }
    });
    
  if (!checkTableOne) {
    return;
  }
 
  that.close();
}
export function copyList(that) {
  if (!that.selectionData || !that.selectionData.length) {
    that.$message.error("请选择数据！");
  }
  that.$refs.xGrid.insertAt(
    that.selectionData.map((item) => {
      let { _X_ROW_KEY, ...other } = item;
      return other;
    }),
    -1
  );
}
