import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom'

//import iconLike from '/src/assets/images/pouce-en-l_air.png';
import './styles.scss';

const Card = ({
  islogged,
  cards,
  onButtonClickProfilUser,
  onClickCardDetails,
}) => {
  
  return (
    <div>
      {/* {console.log("compo cards", cards)} */}
      {cards.map((card) => (
        <Link onClick={onClickCardDetails} to={{
          pathname: "/travel",
          search: `?=${card.id}`,
          state: {card : card}
        }} key={card.id}
        >
        <div className="cardInfos"  >
          <div className="cardInfos-travel">
            <div className="cardInfos-travel_left">

              <a href="#" className="cardInfos-travel_left__profil" onClick={onButtonClickProfilUser}>{card.driver}</a>
              <p className="cardInfos-travel_left__destination">{card.departure_city}</p>
              <p className="cardInfos-travel_left__destination">{card.destination_city}</p>
            </div>
            <div className="cardInfos-travel_right">
              <p className="cardInfos-travel_right__date">{new Date(card.departure_timestamp).toLocaleDateString("fr-FR")}</p> 
              <p className="cardInfos-travel_right__hour">{new Date(card.departure_timestamp).getUTCHours()}h{new Date(card.departure_timestamp).getUTCMinutes()}</p>
            

              <span className="cardInfos-travel_right__tag">{card.activity}</span>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

Card.propTypes = {
/*   onButtonClickProfilUser: PropTypes.func.isRequired,
  onButtonClickValidation: PropTypes.func.isRequired, */
  cards: PropTypes.shape({
    id: PropTypes.number.isRequired,
    pseudo: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
    trajet: PropTypes.string.isRequired,
    //departure: PropTypes.string.isRequired, 
    //arrival: PropTypes.string.isRequired, 
    tag: PropTypes.string.isRequired,
  })
}
export default Card;
