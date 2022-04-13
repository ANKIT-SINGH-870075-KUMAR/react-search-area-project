import React from 'react'
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportToExcel = ({ SearchedListData }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = () => {
        Promise.all(SearchedListData.map(async data => {
            var index = 0;
            if (data.IsValidPincode && index < 11) {
                index++;
                const url = `https://api.postalpincode.in/pincode/${data.PincodeSearched}`;
                const res = await fetch(url);
                return await res.json();
            }
        })).then(results => {
            results = results.filter(res => !!res).map(res => res[0].PostOffice).reduce(
                (previousValue, currentValue) => previousValue.concat(currentValue), []);

            results = results.sort((first, second) => first.Pincode < second.Pincode);
            console.log(results);
            exportToCSV(results, 'SearchedArea' + new Date().getTime());
        }).catch((err) => {
            console.log("Error: ", err);
        });
    }

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <button className="btn btn-outline-dark btn-sm" style={{ marginTop: '10px' }} type="button" onClick={exportToExcel}>Export to excel</button>
    )
}