import React, { useEffect, useState } from 'react'
import './Home.scss'
import {db} from "../../firebase"
import { getDatabase, ref, onValue, set } from "firebase/database";
import Regadera from '../../img/regadera.png'
import Sun from '../../img/sun.png'

export default function Home(props) {

    const [fbData, setFbData] = useState({});
    const [minHumidity, setMinHumidity] = useState(0);
    const [humidity, setHumidity] = useState(0);

    useEffect(()=>{
        document.addEventListener("contextmenu", (event) => { //Bloquea el click derecho
            event.preventDefault();
        });

        

        const starCountRef = ref(db, 'maceta/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const m = -100/900
            const b = 188.8888888
            var humedadPorcentaje = Math.ceil(m*data.humedad+b);
            if(humedadPorcentaje<0){
                humedadPorcentaje = 0
            }
            else if(humedadPorcentaje>100){
                humedadPorcentaje = 100
            }
            setFbData(data)
            setHumidity(humedadPorcentaje)
            setMinHumidity(data.minHumedad)
        });

    },[])
     
    function regar()
    {
        set(ref(db, 'maceta/regar'), true)
    }

    function noRegar(){
        set(ref(db, 'maceta/regar'), false)
    }

    function automatico(){
        set(ref(db, 'maceta/automatico'), !fbData.automatico)
        .then(()=>{

        })
    }

    function minHumiditySlider(range){
        set(ref(db, 'maceta/minHumedad'), parseInt(range))
        setMinHumidity(range)
    }


    return (
        <div className='Home'>
            <div className={fbData.automatico ? "automatic-container automatico" :"automatic-container"}>
                <h2>Automatico:</h2>
                <button onClick={automatico}>{fbData.automatico ? "APAGAR" : "ENCENDER"}</button>
            </div>
            <div className='min-humidity-container'>
                <h3>{minHumidity}%</h3>
                <input onChange={(event) => minHumiditySlider(event.target.value)} className={fbData.automatico ? "min-humidity-slider" : "min-humidity-slider-disabled"} type='range' disabled={!fbData.automatico} value={minHumidity}/>
            </div>
            <div className="humidity-container">
                <div className='humidity-fill' style={{height: `${humidity*230/100}px`}}></div>
                <h2>{humidity}%</h2>
            </div>
            <div className='light-container'>
                <img className="sun-icon" src={Sun}/>
                <div className='light-fill' style={{width: `${fbData.luz}%`}}></div>
            </div>
            <button className="regar" onTouchStart={regar} onTouchEnd={noRegar}>
                <div className="top"></div>
                <img className="regadera-icon" src={Regadera}/>
            </button>
        </div>
    )
}