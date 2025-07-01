import React, { useState, useEffect } from 'react';

export default function DataTableWidget({ config }: { config?: { rows?: number; cols?: number; onUpdateConfig?: (cfg: any) => void } }) {
  const [rows, setRows] = useState<number>(config?.rows ?? 3);
  const [cols, setCols] = useState<number>(config?.cols ?? 3);
  const [tableData, setTableData] = useState<string[][]>([]);

  useEffect(() => {
    const defaultTable: string[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => '')
    );
    setTableData(defaultTable);
  }, [rows, cols]);

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    setTableData((prevTable) => {
      const updatedTable = [...prevTable];
      updatedTable[rowIndex] = [...updatedTable[rowIndex]];
      updatedTable[rowIndex][colIndex] = value;
      return updatedTable;
    });
  };

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setRows(0);
      config?.onUpdateConfig?.({ rows: 0, cols });
      return;
    }
    const newRow = parseInt(value, 10);
    if (!isNaN(newRow)) {
      if (newRow > 10) {
        alert('Maximum 10 rows allowed');
        return;
      }
      setRows(newRow);
      config?.onUpdateConfig?.({ rows: newRow, cols });
    }
  };

  const handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setCols(0);
      config?.onUpdateConfig?.({ rows, cols: 0 });
      return;
    }
    const newCol = parseInt(value, 10);
    if (!isNaN(newCol)) {
      if (newCol > 10) {
        alert('Maximum 10 columns allowed');
        return;
      }
      setCols(newCol);
      config?.onUpdateConfig?.({ rows, cols: newCol });
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', overflow: 'auto', borderRadius: '6px', padding: '10px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label style={labelStyle}>Rows: </label>
        <input type="number" value={rows} onChange={handleRowChange} style={inputStyleSmallVisible} />
        <label style={labelStyle}>Columns: </label>
        <input type="number" value={cols} onChange={handleColChange} style={inputStyleSmallVisible} />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={cellStyle}>
                  <input
                    value={cell}
                    placeholder={`R${rowIndex + 1}C${colIndex + 1}`}
                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                    style={inputStyle}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  marginRight: '8px',
  fontWeight: 600,
  color: '#000',
};

const inputStyleSmallVisible: React.CSSProperties = {
  width: '60px',
  marginRight: '20px',
  padding: '4px 6px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  color: '#000',
  backgroundColor: '#fff',
};

const cellStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '6px',
  textAlign: 'left',
  minWidth: '80px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: 'none',
  background: '#fff',
  outline: 'none',
  fontSize: '14px',
  color: '#000',
};
