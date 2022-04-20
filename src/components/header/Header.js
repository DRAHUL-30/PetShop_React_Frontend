import React,{useState} from 'react';

export const Header = ({ page,setPage}) => {
  const [pageText, setPageText] = useState("TransferOwner");
  const navigateFunction = () => {
    if (page === "home") {
      setPage("ownerTransfer");
      setPageText("Home");
    } else {
      setPage("home");
      setPageText("TransferOwner");
    }
  }
  return (
      <div className='bg-secondary text-white py-4 d-flex justify-content-around'>
      <h3> Adopt Pets </h3>
      <button className='btn btn-primary' onClick={navigateFunction}>{pageText}</button>
      </div>
  )
}