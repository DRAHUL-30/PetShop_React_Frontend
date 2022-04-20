import React, {useState,useEffect,useRef} from "react";
import { getWeb3, initiateContract } from "./newWeb3";
import { Pets } from "./components/pets/Pets";
import "./App.css";
import {Header} from "./components/header/Header";
import { OwnerTransfer } from "./components/ownerTransfer/OwnerTransfer";
import 'bootstrap/dist/css/bootstrap.min.css';  
import Adoption from "./contracts/Adoption.json";

const App = () => {
  const [state, setState] = useState({ web3: null,accounts:null,contract:{},adoptersArray:[] });
  const [page,setPage] = useState("home");
  const initialRender = useRef(true);

  useEffect (() => {
    console.log("first useEffect");
    componentMountFunction("adoption",Adoption);
  },[]);

  useEffect (async() => {
    console.log("second useEffect");
    if(!initialRender.current){
      await getValue();
    }
    else{
      initialRender.current = false;
    }
  },[state["contract"]]);

  const componentMountFunction = async ( contractsName, Adoption) => {
    try{
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      console.log(accounts,"acc");
      const instance = await initiateContract(web3,Adoption);
      setState({...state,web3,accounts,contract:{...state["contract"],[contractsName]:instance}});
    } catch (error) {
      alert("failed to load web3, accounts, or contract");
    }
  }

  const getValue = async () => {
    console.log(state["contract"]["adoption"]);
    const response = await state["contract"]["adoption"].methods.getAdopters().call();
    console.log(response);
    setState({...state,adoptersArray:response});
  }

  if(!state.web3){
    return <div>Loading Web3, accounts and contract...</div>;
  }

  return(
    <div className="App">
      <Header page={page} setPage={setPage}/>
      {page === "home" ? <Pets state={state} setState={setState} /> :
        <OwnerTransfer state={state}  contractInitiation={componentMountFunction}/>
      }
      </div>
  )
}

export default App;
