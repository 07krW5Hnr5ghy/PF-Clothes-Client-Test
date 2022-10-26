import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSellDetail } from "../../redux/actions/index.js"

const SellDetail = () => {

    const dispatch = useDispatch()
    const { idSell } = useParams()

    useEffect(() => {
        dispatch(getSellDetail(idSell))
    }, [])

    const detail = useSelector(state => state.sellDetail)

    return (
        <div>
            <img src={detail.image} alt="foto" />
            <h1>{detail.name}</h1>
            <h3>{detail.buyer}</h3>
            <h3>{detail.location}</h3>
            <p>Salida: {detail.sendedDate}</p>
            <p>Entrega: {detail.receivedDate}</p>
            <p>Reseña del comprador: {detail.review}</p>
            
        </div>
    );
};

export default SellDetail;