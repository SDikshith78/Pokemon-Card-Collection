import React, { useState } from 'react'
import Axios from './Axios API/Axios'
import PokemonModal from './redux/PokemonModal'
import Navbar from '../components/Navbar'

export default function Home() {

  return (
    <div >
      <div className='flex justify-center items-center '>
        <img className='flex justify-center items-center w-[300px] h-[200px] object-cover mt-3' src="/images/Pokemon Logo.png" alt="" />
      </div>
      <div className='flex flex-row justify-center items-center mt-5 flex-wrap'>

      <Axios/>
      </div>
      <PokemonModal/>
    </div>
  )
}
