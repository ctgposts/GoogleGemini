
import React from 'react';

interface DataTableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

const DataTable = <T,>({ headers, data, renderRow }: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left font-montserrat">
        <thead className="text-xs text-luxury-gold uppercase bg-luxury-gold/10 font-oswald">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-transparent border-b border-luxury-gold/10 hover:bg-white/30 transition-colors duration-200">
              {renderRow(item)}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-luxury-dark-text/50">
          No data available.
        </div>
      )}
    </div>
  );
};

export default DataTable;