import readXlsxFile from "read-excel-file";
import ExcelJS from "exceljs";

async function readExcel(file, transportName) {
  try {
    const rows = await readXlsxFile(file[0]);
    const kerryRows = rows.filter((row) => row.some((cell) => cell === transportName));
    if (!kerryRows.length) {
      throw new Error(`Transport '${transportName}' not found in file`);
    }
    console.log(`Found data for '${transportName}':`, kerryRows);

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a new worksheet
    const worksheet = workbook.addWorksheet("Kerry");

    // Add the data to the worksheet
    kerryRows.forEach((row) => {
      worksheet.addRow(row);
    });

    // Save the workbook
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Kerry.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(`Error reading Excel file: ${err}`);
  }
}

function readTransportExcel(file) {
  readExcel(file, "Kerry"); // transport name you want to search for
}

export default readTransportExcel;
