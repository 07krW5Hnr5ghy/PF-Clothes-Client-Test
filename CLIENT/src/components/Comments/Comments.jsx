import Rating from '@mui/material/Rating';
import Styles from "./Comments.module.css"

const Comments = ({score, reviews}) => {
    return (
        <div>
            <div>
                <Rating value={score} readOnly sx={{fontSize: '5rem',}}/>
            </div>
            <div>
                <p className={Styles.Reseñas}>{reviews}</p>
            </div>
        </div>
    );
};

export default Comments;