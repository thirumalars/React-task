import React, { useState, useEffect } from "react";

import LOADINGIMAGE from '../../assets/images/load.gif'

function Product(props) {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const fetchURL = "https://hplussport.com/api/products/order/price/sorc/qty/100"
    const getData = () =>
        fetch(`${fetchURL}`)
            .then((res) => res.json())
    useEffect(() => {
        getData().then((data) => {
            setData(data)
            setLoad(false)
        })
    }, [])

    function sortData(e) {
        let key = e.target.id;
        let keyContent = e.target.textContent;
        let datas = Object.assign([], data);
        if (key === "id" || key === "price") {
            if (keyContent === "Ascending")
                datas.sort(function (a, b) { return a.id - b.id });
            else
                datas.sort(function (a, b) { return b.id - a.id });
        }
        else if (key === "name" || key === "description") {
            if (keyContent === "Ascending")
                datas.sort(function (a, b) { return a.description.localeCompare(b.description) });
            else
                datas.sort(function (a, b) { return b.description.localeCompare(a.description) });
        }
        setData(datas);
    }

    return (
        <>
            {load ? <img src={LOADINGIMAGE} /> :
                <div className="product">
                    <table>
                        <tbody>
                            <tr>
                                <th>USERID
                                    <div className="dropdown-content">
                                        <a id="id" onClick={(e) => sortData(e)}>Ascending</a>
                                        <a id="id" onClick={(e) => sortData(e)}>Descending</a>
                                    </div>
                                </th>
                                <th>NAME
                                    <div className="dropdown-content">
                                        <a id="name" onClick={(e) => sortData(e)}>Ascending</a>
                                        <a id="name" onClick={(e) => sortData(e)}>Descending</a>
                                    </div>
                                </th>
                                <th>DESCRIPTION
                                    <div className="dropdown-content">
                                        <a id="description" onClick={(e) => sortData(e)}>Ascending</a>
                                        <a id="description" onClick={(e) => sortData(e)}>Descending</a>
                                    </div>
                                </th>
                                <th>PRICE
                                    <div className="dropdown-content">
                                        <a id="price" onClick={(e) => sortData(e)}>Ascending</a>
                                        <a id="price" onClick={(e) => sortData(e)}>Descending</a>
                                    </div>
                                </th>
                            </tr>

                            {data && data.length ? data.map((item, index) =>
                                <tr key={index}><td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                </tr>) : null}</tbody>
                    </table>
                </div>}</>
    )
}
export default Product;