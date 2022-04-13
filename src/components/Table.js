import React, { useState } from 'react'
import Card from './Card';
import { ExportToExcel } from './ExportToExcel';

const Table = (props) => {
    /*use hook */
    let [PostOffice, setPostOffice] = useState([]);
    let [Pincode, setPincode] = useState('');
    let [color, setColor] = useState('light');
    let [SearchedListData, setListData] = useState([]);
    let [SelectedRow, setSelectedRow] = useState();

    /*display search list and table  */
    const TableItems = () => {
        let currentDateTime = SearchedListData[SearchedListData.length - 1]?.SearchTime;
        return PostOffice.map((element, index) => {
            return (
                <tr style={{ cursor: 'pointer' }} key={index} onClick={() => setSelectedRow(element)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <td>{currentDateTime}</td>
                    <td>{element.Pincode}</td>
                    <td>{element.Name}</td>
                    <td>{element.BranchType}</td>
                    <td>{element.Circle}</td>
                    <td>{element.Region}</td>
                    <td>{element.State}</td>
                    <td>{element.Country}</td>
                </tr>
            )
        });
    }

    const SeachedPincodes = SearchedListData.map((element, index) => {
        return (
            <li key={index + 1000}>{element.PincodeSearched} | {element.SearchTime}</li>
        )
    });

    /*fetch data from Api */
    const fetchData = (e) => {
        e.preventDefault();

        const url = `https://api.postalpincode.in/pincode/${Pincode}`
        fetch(url).then(data => data.json()).then(jsonData => {
            if (jsonData && jsonData.length > 0 && jsonData[0].Status === 'Success') {
                let postOffices = (jsonData[0].PostOffice && jsonData[0].PostOffice.length > 11) ?
                    jsonData[0].PostOffice.splice(0, 11) : jsonData[0].PostOffice;
                setPostOffice(postOffices);

                if (!SearchedListData.find(data => data.PincodeSearched === Pincode)) {
                    let newSearchedData = { SearchTime: new Date().toString(), PincodeSearched: Pincode, IsValidPincode: true };
                    let list = [...SearchedListData, newSearchedData];
                    setListData(list);
                }

                if (Pincode % 2 === 0) {
                    setColor('info');
                }
                else {
                    setColor('danger');
                }
            } else {
                alert("Invalid pincode");
                setPostOffice([]);
                if (!SearchedListData.find(data => data.PincodeSearched === Pincode)) {
                    let newSearchedData = { SearchTime: new Date().toString(), PincodeSearched: Pincode, IsValidPincode: false };
                    let list = [...SearchedListData, newSearchedData];
                    setListData(list);
                }
            }
        }, (error) => {

            alert(error, "Invalid pincode");
        })
    }

    /*give input value */
    const changePincode = (event) => {
        setPincode(event.target.value);
    }

    /*for Display Popup only five index*/
    // const updateSelectedRow = (rowData, index)=>{
    //     if(rowData && index < 5){
    //         console.log(rowData);
    //         setSelectedRow(rowData);
    //     } else {
    //         setSelectedRow(undefined);
    //     }
    // }

    /*display Popup*/
    const DisplayPopup = () => {
        if (SelectedRow) {
            return <Card areaDetails={SelectedRow} />
        }

    }

    return (
        <>
            <h1 className="d-flex justify-content-center" style={{ marginTop: '90px' }}>{props.heading}</h1>

            {/* search bar and button */}
            <div className="container my-5 mb-2">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search Pincode" aria-label="Search" value={Pincode} onChange={changePincode} />
                    <button className="btn btn-outline-dark btn-sm" type="submit" onClick={fetchData}>Search</button>
                </form>
                <ExportToExcel SearchedListData={SearchedListData} />
            </div>

            {/*show search history*/}
            <div className='my-2' >Seached list
                <ul>
                    {SeachedPincodes}
                </ul>
            </div>

            {/*Create a table */}
            <table className="table my-2"  >
                <thead className='table table-dark'>
                    <tr>
                        <th scope="col">Search time</th>
                        <th scope="col">Pincode</th>
                        <th scope="col">Name</th>
                        <th scope="col">Branch Type</th>
                        <th scope="col">Circle</th>
                        <th scope="col">Region</th>
                        <th scope="col">State</th>
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody className={`table table-${color}`}>
                    <TableItems />
                </tbody>
            </table>
            <DisplayPopup />
        </>
    )
}

export default Table
