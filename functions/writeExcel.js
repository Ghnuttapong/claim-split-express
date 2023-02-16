import useKerryStore from "@/store/kerryData";
import useShopeeStore from "@/store/shopeeData";
import React from "react";

function writeExcel({ kerry }) {
  const Onclick = () => {};
  console.log(`Found data for`, kerry);
  return (
    <React.Fragment>
      {!!kerry && <button>Kerry</button>}
    </React.Fragment>
  );
}

export default writeExcel;
