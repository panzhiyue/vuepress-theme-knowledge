# Exceljs

## 参考资源

https://zhuanlan.zhihu.com/p/426838654



## 创建并下载

```
import * as Excel from "exceljs";
import {saveAs} from "file-saver"
```



```javascript
let workbook = new Excel.Workbook();
workbook.creator = "Web";
workbook.lastModifiedBy = "Web";
workbook.created = new Date();
workbook.modified = new Date();
workbook.lastPrinted = new Date();
let worksheet = workbook.addWorksheet("Sheet1");
const title = "我的天呀";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
worksheet.addRow([title]);
workbook.xlsx.writeBuffer().then((data) => {
  const blob = new Blob([data], { type: EXCEL_TYPE });
  saveAs(blob, "download.xlsx");
});
```

