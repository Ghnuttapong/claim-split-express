import useKerryStore from "@/store/kerryData";
import useShopeeStore from "@/store/shopeeData";
import readXlsxFile from "read-excel-file";
import writeXlsxFile from "write-excel-file";
import { WriteExcel } from ".";

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
      value: "Name",
      fontWeight: "bold",
    },
    {
      value: "Date of Birth",
      fontWeight: "bold",
    },
    {
      value: "Cost",
      fontWeight: "bold",
    },
    {
      value: "Paid",
      fontWeight: "bold",
    },
  ];
  const DATA_ROW_1 = [
    // "Name"
    {
      type: String,
      value: "John Smith",
    },

    // "Date of Birth"
    {
      type: Date,
      value: new Date(),
      format: "mm/dd/yyyy",
    },

    // "Cost"
    {
      type: Number,
      value: 1800,
    },

    // "Paid"
    {
      type: Boolean,
      value: true,
    },
  ];

  const data = [HEADER_ROW, DATA_ROW_1];
  await writeXlsxFile(data, {
  fileName: 'kerryClaim.xlsx'
})

}

function readTransportExcel(file) {
  readExcel(file, "Kerry"); // transport name you want to search for
  // readExcel(file, "Shopee Xpress");
}

export default readTransportExcel;
