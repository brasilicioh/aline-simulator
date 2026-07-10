import { useNavigate } from "react-router-dom";

import bra from '@assets/bra.png'
import gui from '@assets/gui.png'
import jad from '@assets/jad.png'
import tak from '@assets/tak.png'
import kai from '@assets/kai.png'

export function Credits() {
  const navigate = useNavigate();


  return (
    <div className="bg-gray-800 flex flex-col gap-3 items-center min-h-screen">
      <h1 className="text-white relative border-white border-6 border-bs-gray-600 border-s-gray-600 flex items-center justify-center mt-6 py-2 w-[85%] bg-black">
        <p className="text-4xl font-semibold text-center">
          ~$ The Gamers Republic
        </p>
        <p className="animate-[piscar-seco_1.5s_steps(1,end)_infinite] font-bold self-end">
          ___
        </p>
        <p className="absolute right-0 text-2xl text-end hover:text-blue-700"
        onClick={() => navigate('/')}
        >
          Go back?
        </p>
      </h1>

      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col relative justify-center items-center">
          <img
            src={kai}
            alt=""
            className="w-60 h-60"
          />
          <p className="text-center w-60 absolute bottom-0 bg-black text-white">
            Alien: Kaio
          </p>
        </div>
        <div className="flex flex-col relative justify-center items-center">
          <img
            src={jad}
            alt=""
            className="w-60 h-60"
          />
          <p className="text-center w-60 absolute bottom-0 bg-black text-white">
            Alien: Jade
          </p>
        </div>
        <div className="flex flex-col relative justify-center items-center">
          <img
            src={gui}
            alt=""
            className="w-60 h-60"
          />
          <p className="text-center w-60 absolute bottom-0 bg-black text-white">
            Alien: Guilherme
          </p>
        </div>
        <div className="col-span-3 gap-5 flex justify-center">
          <div className="flex flex-col relative justify-center items-center">
            <img
              src={bra}
              alt=""
              className="w-60 h-60"
            />
            <p className="text-center w-60 absolute bottom-0 bg-black text-white">
              Alien: Brasilicio
            </p>
          </div>
          <div className="flex flex-col relative justify-center items-center">
            <img
              src={tak}
              alt=""
              className="w-60 h-60"
            />
            <p className="text-center w-60 absolute bottom-0 bg-black text-white">
              Alien: Talita
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
