import { useState } from "react";
import { Minus, Plus } from "lucide-react";


export default function Counter({ticketCount, setTicketCount}) {
    

    const onClickMinus = () => {
        if(ticketCount<=1) {
            alert('Tickets can not be zero')
        }
        else {
            setTicketCount(ticketCount-1)
        }
    }

    const onClickPlus = () => {
        setTicketCount(ticketCount+1)
    }


    return (
        <div className="flex items-center border rounded-full">
  
                  <button 
                  className="w-12 h-12 flex items-center justify-center"
                  onClick={() => onClickMinus()}>
                    <Minus size={18} />
                  </button>
  
                  <span className="px-6 font-bold text-xl">
                    {ticketCount}
                  </span>
  
                  <button 
                    className="w-12 h-12 flex items-center justify-center"
                    onClick={() => onClickPlus()}>
                    <Plus size={18} />
                  </button>
  
        </div>
    );
}