import React, { useContext } from 'react';
import pt from 'prop-types';

import CardContext from "../../context/cardContext";

import logo from '../../assets/logo.png';

import './styles.scss';

const Card = props => {
  const {
    cardName,
    lastFourDigit,
    expiry,
    color
  } = props;

  const { openCardDetail } = useContext(CardContext);

  return (
    <div className="card-item-container">
      <div
        className="card-item"
        style={{
          backgroundColor: `#${color}`
        }}
        onClick={() => openCardDetail(props)}
      >
        <div className="card-item-logo">
          <img src={logo} width={24} height={24} alt="spenmo logo"/>
        </div>
        <p className="card-item-name">{cardName}</p>
        <p className="card-item-number">**** **** **** {lastFourDigit}</p>
        <div className="card-item-expiry">
          <p className="expiry-title">EXPIRY</p>
          <p className="expiry-date">{expiry.format('M')}/{expiry.format('YYYY')}</p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  cardName: pt.string,
  lastFourDigit: pt.string,
  expiry: pt.object,
  color: pt.string
};

export default Card;