
import React, { useEffect, useState } from 'react';
import BoroughButton from './borough';
import '../App.css';

interface Props {
  user: Object,
}

function Home(props: Props) {

  return (
    <div className="App">
      <div className="instructions">
        <p>1. START BY CHOOSING A BOROUGH AND EXPLORING THE list of activities</p>
        <p>2. TAKE A PICTURE WHEN YOU COMPLETE EACH TASK AND UPLOAD IT</p>
        <p>3. WITH EVERY COMPLETION, you get a raffle ticket to enter for a chance to win a giveaway prize of your choice!</p>
      </div>
      <div className="boroughs">
        <BoroughButton borough="Manhattan"/>
        <BoroughButton borough="Queens"/>
        <BoroughButton borough="Brooklyn"/>
      </div>
      <div className="raffleTicketsCopy">
        <p className='raffleLabel'>MY raffle tickets</p>
        <div className="ticketsData">
          <span>10 Available</span>
          <span>2 Entered</span>
        </div>
        <button>
          Enter Raffles
        </button>
      </div>
    </div>
  );
}

export default Home;