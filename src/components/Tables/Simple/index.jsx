export default function SimpleTable({ headers, children }) {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-2 sm:-mx-4 lg:-mx-6 table-height min-h-96 table-scrollbar overflow-auto border rounded-md">
        <table className="mx-auto min-w-full divide-gray-300">
          <thead className="sticky top-0 shadow-sm shadow-gray-300 bg-white">
            <tr className="py-2 text-gray-900">
              <th
                scope="col"
                className="whitespace-nowrap py-3.5 px-3 text-left text-sm font-semibold"
              >
                #
              </th>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="whitespace-nowrap py-3.5 px-3 text-left text-sm font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
