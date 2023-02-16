import readXlsxFile from "read-excel-file";
import writeXlsxFile from "write-excel-file";

async function readExcel(file, transportName) {
  try {
    const rows = await readXlsxFile(file[0]);
    const kerryRows = rows.filter((row) =>
      row.some((cell) => cell === transportName)
    );
    if (!kerryRows.length) {
      throw new Error(`Transport '${transportName}' not found in file`);
    }
    if (transportName === "Kerry")
      writeTransportXlsxFile(kerryRows, transportName);
  } catch (err) {
    console.error(`Error reading Excel file: ${err}`);
  }
}

async function writeTransportXlsxFile(kerryRows, transportName) {
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

  kerryRows.forEach((item, index) => {
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
  console.log(data)
  await writeXlsxFile(data, {
    fileName: `${transportName}Claim.xlsx`,
  });
}

function readTransportExcel(file, transportName) {
  readExcel(file, transportName);
}

export default readTransportExcel;
