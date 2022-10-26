import React, { useEffect } from 'react';
import { getSellsHistory } from "../../redux/actions/index.js"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SellsGraphic from "../SellsGraphic/SellsGraphic.jsx"

const Stadistics = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSellsHistory())
    }, [dispatch])

    const sellsHistory = useSelector(state => state.sellsHistory)

    return (
        <div>
            <h1>Panel de Control</h1>
            <div>
                <SellsGraphic />
                {
                    sellsHistory.length ? sellsHistory.map(sell => {
                        return (
                            <div>
                                <img src={sell.img} alt="foto" />
                                <h4>{sell.name}</h4>
                                <p>{sell.buyer}</p>
                                <p>{sell.location}</p>
                                <Link to={`/sell/${sell.id}`}>
                                    <p>Más detalles de la compra</p>
                                </Link>
                            </div>
                        )
                    }) : <h2>Aquí van a aparecer las ventas que hayas realizado</h2>
                }
            </div>
        </div>
    );
};

export default Stadistics;