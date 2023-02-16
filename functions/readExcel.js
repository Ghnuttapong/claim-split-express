import readXlsxFile from "read-excel-file";

async function readExcel(file, transportName) {
  try {
    const rows = await readXlsxFile(file[0]);
    const kerryRows = rows.filter((row) => row.some((cell) => cell === transportName));
    if (!kerryRows.length) {
      throw new Error(`Transport '${transportName}' not found in file`);
    }
    console.log(`Found data for '${transportName}':`, kerryRows);
  } catch (err) {
    console.error(`Error reading Excel file: ${err}`);
  }
}

function readTransportExcel(file) {
  readExcel(file, "Kerry"); // transport name you want to search for
}

export default readTransportExcel;
