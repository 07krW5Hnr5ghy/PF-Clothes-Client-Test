import Rating from '@mui/material/Rating';
import {useEffect, useState} from "react"
import Styles from "./CreateReview.module.css"
import { createReviewProduct } from '../../redux/actions';
import { getSession } from "../../sessionUtils/jwtSession";
import { useDispatch } from 'react-redux';

const CreateReview = ({id}) => {
    const [rating, setRating] = useState({value: null, text: ""})
    const [info, setInfo] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
        if (!info) {
            const data = await getSession();
            setInfo(data);
        }})();
    }, [info]);

    const errorhandle = (event) => {
        if(rating.value && rating.text) {
            postReview()
        } else {
            setError("Necesita brindar una Puntuacion y un Comentario");
        }
    }

    const handdleChange = (e) => {
        setRating({...rating, text: e.target.value});
    }

    const postReview = () => {
        const data = {
            score: rating.value,
            reviews: rating.text
        }
        dispatch(createReviewProduct(id, data, info.token)).then(alert("Reseña creada con exito").catch(alert("Algo salio mal")));
    }

    return (
        <div>
            <h1 className={Styles.MakeReviewTittle}>Realizar Reseña</h1>
            <div>
                <Rating value={rating.value} onChange={(event, newvalue) => setRating({...rating, value: newvalue})} sx={{fontSize: '5rem',}}/>
            </div>
            {!error ? null : <span>{error}</span>}
            <div className={Styles.ReviewFormsContainer}>
                <form className={Styles.ReviewForms} onSubmit={(e) => {
                    e.preventDefault();
                    errorhandle(e)
                }}>
                    <textarea className={Styles.ReviewText} name="" id="" cols="30" rows="10" onChange={(evento) => handdleChange(evento)} placeholder={"Introduzca Reseña..."}></textarea>
                    <input className={Styles.MakeReviewButton} type="submit" value="Enviar"/>
                </form>
            </div>
        </div>
    );
};

export default CreateReview;