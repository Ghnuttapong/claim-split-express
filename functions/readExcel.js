import readXlsxFile from "read-excel-file";
import fs from "fs";
import xlsx from "xlsx";

function readExcel(file) {
  readXlsxFile(file[0]).then(async (rows) => {
    // function แยกขนส่งใส่ใน ()
    // ใน function รับ 1 paramiter
    // rows.filter()
    console.log(rows);
  });
}

export default readExcel;
