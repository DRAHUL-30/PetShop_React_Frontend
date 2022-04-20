import React, {useState,useEffect} from "react";
import {petsData} from "../../res/petsData";
import { Cards } from "../card/Cards"; 

export const Pets = ({ state,setState }) => {
    const [petsAdoptedArray, setPetsAdoptedArray] = useState([]);

    useEffect(() => {
        updateAdoptedArray(state["adoptersArray"]);
    },[state])

    const updateAdoptedArray = (array) => {
        console.log(array);
        let arr=[];
        array.filter((item,index)=>{
            if(item !== '0x0000000000000000000000000000000000000000'){
                console.log(index);
                arr.push(index);
            }
            console.log(arr);
            setPetsAdoptedArray(arr);
        })
    }

    const updatePetAdopted = async (id,price) => {
        const petPriceToEther = price*1000000000000000000;
        if(state["contract"].adoption){
            await state["contract"]["adoption"].methods.adopt(id).send({from : state["accounts"][0]});
            await state["contract"]["adoption"].methods.transferEther().send({from :state["accounts"][0],value:petPriceToEther});
            const response = await state["contract"]["adoption"].methods.getAdopters().call();
            setState({...state,adoptersArray:response});
        }
        else{
            alert('contract is not initiated');
        }
    }

    return(
        <div>
          {petsData.length && petsData.map((pet,index) => {
              return (
                  <Cards
                      key={index}
                      name={pet.name}
                      age={pet.age}
                      breed={pet.breed}
                      location={pet.location}
                      img={pet.picture}
                      id={pet.id}
                      price={pet.price}
                      update={updatePetAdopted}
                      disabled={petsAdoptedArray.includes(pet.id)}
                  /> 
              )
          })}
        </div>
    )
}