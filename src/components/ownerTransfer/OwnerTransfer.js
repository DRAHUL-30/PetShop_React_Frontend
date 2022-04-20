import React, { useEffect, useRef, useState } from 'react';
import Transfer from "../../contracts/Transfer.json";

export const OwnerTransfer = ({ state, contractInitiation }) => {
    const initialRender = useRef(true);
    const [input, setInput] = useState({
        name: "",
        address: ""
    });
    const [owner, setOwner] = useState("");

    useEffect(() => {
        contractInitiation("transfer", Transfer);
    }, []);

    const inputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const transferOwnerToAddress = async() => {
        if (input["address"].length && input["name"].length) {
            let newOwnerAddress = await state["contract"]["transfer"].methods.transferOwner(input["address"], input["name"]).send({ from: state["accounts"][0] });
            console.log(newOwnerAddress);
            if (newOwnerAddress["status"]) {
                setOwner(input["address"]);
            }
        }
        else {
            alert("Enter address and name");
        }
    }

    return (
      <div>
        <div className='w-50' style={{margin:"0 auto"}}>
            <div className='d-flex align-items-center my-3'>
                <label className='mx-2 w-25'>Name:</label>
                <input className='form-control' name="name" value={input["name"]} onChange={(e) => inputChange(e)}/>
            </div>
            <div className='d-flex align-items-center my-3'>
                <label className='mx-2 w-25'>Address:</label>
                <input className='form-control' name="address" value={input["address"]} onChange={(e) => inputChange(e)}/>
            </div>
            <button className='btn btn-success' onClick={transferOwnerToAddress}>Transfer</button>

            {owner.length>0 && <p>The owner address is <b>{owner}</b></p>}
        </div>
    </div>
  )
}