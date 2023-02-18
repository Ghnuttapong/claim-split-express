import readXlsxFile from "read-excel-file";
import writeXlsxFile from "write-excel-file";
import Exists from "./exists";

async function readExcel(file, transportName) {
  try {
    const rows = await readXlsxFile(file[0]);
    const transportRows = rows.filter((row) => row[25] == transportName);
    if (!transportRows.length) {
      throw new Error(`Transport '${transportName}' not found in file`);
    }

    const data = await Exists(transportRows);
    await writeXlsxFile(data, {
      fileName: `${transportName}Claim.xlsx`,
    });
  } catch (err) {
    console.error(`Error reading Excel file: ${err}`);
  }
}

async function writeTransportXlsxFile(transportRows, transportName) {
  const HEADER_ROW = [
    {
      value: "ลำดับ",
      fontWeight: "bold",
    },
    {
      value: "หมายเลขสั่งซื้อ",
      fontWeight: "bold",
    },
    {
      value: "เลขติดตามพัสดุ",
      fontWeight: "bold",
    },
    {
      value: "ค่าน้ำหนัก (kg)",
      fontWeight: "bold",
    },
    {
      value:
        "ภาพสินค้า (พร้อมกล่องบรรจุและวัสดุกันกระแทก วางบนเครื่องชั่งให้เห็นตัวเลขน้ำหนักชัดเจน)",
      fontWeight: "bold",
    },
  ];

  const DATA_ROW_ARR = [];

  transportRows.forEach((item, index) => {
    DATA_ROW_ARR.push([
      {
        type: Number,
        value: index + 1,
      },
      {
        type: String,
        value: item[0].toString(),
      },
      {
        type: String,
        value: item[40].toString(),
      },
      {
        type: String,
        value: item[43].toString(),
      },
      {
        type: String,
        value: "",
      },
    ]);
  });

  const data = [HEADER_ROW, ...DATA_ROW_ARR];
  console.log(data);
  await writeXlsxFile(data, {
    fileName: `${transportName}Claim.xlsx`,
  });
}

function readTransportExcel(file, transportName) {
  readExcel(file, transportName);
}

export default readTransportExcel;
