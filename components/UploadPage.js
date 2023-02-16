import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ReadExcel } from "@/functions";

function UploadPage({ name }) {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    ReadExcel(acceptedFiles, name);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv':  ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    onDrop,
  });

  return (
    <div className="container mx-auto p-4 dropzone">
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-6"
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="">Drop the files here ...</p>
        ) : (
          <p
            className
            style={{
              borderStyle: "solid",
              padding: 20,
              width: 500,
              height: 300,
              textAlign: "center",
            }}
          >
            ลากบางไฟล์ที่นี่ หรือคลิกเพื่อเลือกไฟล์
          </p>
        )}
      </div>
      {files.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-700 mb-2">
            Uploaded Files:
          </h2>
          {files.map((file) => (
            <div className="flex flex-col items-start mb-4" key={file.name}>
              <h3 className="text-gray-700 font-bold">{file.name}</h3>
              <p className="text-gray-500">Size: {file.size} bytes</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadPage;
