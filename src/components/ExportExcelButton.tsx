import React from 'react';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { Booking } from '../interfaces';
import Button from './Button';
import { mdiMicrosoftExcel } from '@mdi/js';

const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';
type Props = {
  fileName: string;
  csvData: Booking[];
};
export default function ExportBookingsToExcel(props: Props) {
  const exportToCSV = (props) => {
    const ws = XLSX.utils.json_to_sheet(props.csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, props.fileName + fileExtension);
  };
  return (
    <Button
      onClick={() => exportToCSV(props)}
      icon={mdiMicrosoftExcel}
      color="info"
      label="Export"
      small
      className="h-10"
    />
  );
}
