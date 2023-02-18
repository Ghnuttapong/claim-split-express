import React from "react";

export default async function Exists(Rows) {
  const DATA_ROW_ARR = [];
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

  Rows.forEach((item, index) => {
    const allExistInData = item.every((element) =>
      DATA_ROW_ARR.includes(element)
    );

    if (allExistInData) {
      DATA_ROW_ARR.push([
        {
          type: Number,
          value: index + 1,
          backgroundColor: "#FFED00",
        },
        {
          type: String,
          value: item[0].toString(),
          backgroundColor: "#FFED00",
        },
        {
          type: String,
          value: item[40].toString(),
          backgroundColor: "#FFED00",
        },
        {
          type: String,
          value: item[43].toString(),
          backgroundColor: "#FFED00",
        },
        {
          type: String,
          value: "",
        },
      ]);
    }else {
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
    }
  });

  const data = [HEADER_ROW, ...DATA_ROW_ARR];
  return data;
}
