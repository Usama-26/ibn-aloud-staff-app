import { useEffect, useState } from "react";

export default function TableSkeleton({ headers }) {
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    // Calculate the number of rows based on the screen height
    const screenHeight = window.innerHeight;
    const rowHeight = 40; // Adjust this based on your design
    const calculatedRowCount = Math.floor(screenHeight / rowHeight);
    setRowCount(calculatedRowCount);
  }, []);

  const skeletonRows = Array.from({ length: rowCount }, (_, index) => (
    <tr key={index} className="">
      {headers.map((heading) => (
        <td
          key={heading}
          className="whitespace-nowrap p-3 text-sm font-medium bg-gray-300 animate-pulse"
        ></td>
      ))}
    </tr>
  ));

  return (
    <div className="mt-8 flow-root">
      <div
        className="-mx-2 sm:-mx-4 lg:-mx-6 
       table-scrollbar overflow-auto border rounded-md"
      >
        <table className="mx-auto min-w-full divide-gray-300">
          <tbody className="bg-white">{...skeletonRows}</tbody>
        </table>
      </div>
    </div>
  );
}
