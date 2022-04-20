import React from 'react';
import { Header } from '../header/Header';
import { Pets } from '../pets/Pets';

export const Home = ({ state, setState }) => {
    console.log(state,setState);
  return (
      <div>
          <Header />
         <Pets state={state} setState={setState}/>
    </div>
  )
}