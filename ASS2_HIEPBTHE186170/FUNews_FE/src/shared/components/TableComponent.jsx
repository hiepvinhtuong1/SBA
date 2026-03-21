import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TableComponent = ({ columns, data, emptyMessage = "No data available", pageSize = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when data changes (e.g., search or delete)
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full overflow-hidden rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest shadow-sm">
        <div className="overflow-x-auto custom-scrollbar min-h-[400px]">
          <table className="w-full text-left border-collapse h-full">
            <thead>
              <tr className="bg-surface-container-low/50">
                {columns.map((col) => (
                  <th 
                    key={col.key} 
                    className={`px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant border-b border-surface-variant/30 ${col.align === 'right' ? 'text-right' : ''}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant/10">
              {currentData.length > 0 ? (
                currentData.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className="hover:bg-surface-container-high/50 transition-colors group"
                  >
                    {columns.map((col) => (
                      <td 
                        key={col.key} 
                        className={`px-8 py-6 text-sm font-medium text-on-surface ${col.align === 'right' ? 'text-right' : ''}`}
                      >
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-40">
                      <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      {data.length > pageSize && (
        <div className="flex items-center justify-between px-4 py-3 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest pl-2">
            Showing <span className="text-primary">{(currentPage - 1) * pageSize + 1}</span> 
            {' '}to{' '} 
            <span className="text-primary">{Math.min(currentPage * pageSize, data.length)}</span> 
            {' '}of{' '} 
            <span className="text-on-surface">{data.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-on-surface-variant"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 px-3">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    currentPage === i + 1 
                      ? 'bg-primary text-on-primary shadow-sm shadow-primary/20 scale-110' 
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-on-surface-variant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
