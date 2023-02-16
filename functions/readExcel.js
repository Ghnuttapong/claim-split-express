import readXlsxFile from "read-excel-file"


function readExcel( file ) {
    readXlsxFile(file[0]).then((rows) => {
        // function แยกขนส่งใส่ใน ()
        // ใน function รับ 1 paramiter
        // rows.filter()
        console.log(rows[1]);
    })
}

export default readExcel
