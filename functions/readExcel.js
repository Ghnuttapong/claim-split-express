import readXlsxFile from "read-excel-file";
import ExcelJS from "exceljs";

async function readExcel(file, transportName) {
  try {
    // const setKerrys = useKerryStore((state) => state.setKerrys);
    // const setShopee = useShopeeStore((state) => state.setShopee);
    const rows = await readXlsxFile(file[0]);
    const kerryRows = rows.filter((row) =>
      row.some((cell) => cell === transportName)
    );
    if (!kerryRows.length) {
      throw new Error(`Transport '${transportName}' not found in file`);
    }
    console.log(`Found data for '${transportName}':`, kerryRows);

    if (transportName === "Kerry") writeKerryXlsxFile(kerryRows);
    // if(transportName === "Shopee Xpress") await setShopee(kerryRows);
  } catch (err) {
    console.error(`Error reading Excel file: ${err}`);
  }
}

async function writeKerryXlsxFile(kerryRows) {
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

  const data = [HEADER_ROW, ...DATA_ROW_ARR ];
  await writeXlsxFile(data, {
    fileName: "kerryClaim.xlsx",
  });
}

function readTransportExcel(file) {
  readExcel(file, "Kerry"); // transport name you want to search for
  // readExcel(file, "Shopee Xpress");
}

export default readTransportExcel;
