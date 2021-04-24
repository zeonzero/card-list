import React, { useState, useContext } from 'react';
import pt from 'prop-types';
import moment from 'moment';

import Modal from "../Modal";

import CardContext from "../../context/cardContext";

import './styles.scss';

const currencyFormat = numberStr => {
  if(!numberStr) {
    return '0';
  }

  return numberStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

const CardForm = props => {
  const { onClose } = props;

  const { setNewCard } = useContext(CardContext);

  const [ cardName, setCardName ] = useState('');
  const [ color, setCardColor ] = useState('');
  const [ spendLimit, setSpendLimit ] = useState('0');

  const handleResetData = () => {
    setCardName('');
    setCardColor('');
    setSpendLimit('0');
  };

  const handleSetColor = e => {
    e.preventDefault();

    const { value } = e.target;
    const regex = /^#[a-f0-9]{0,6}$/;

    let newValue = value || '';

    if(newValue[0] !== '#' && value !== '') {
      newValue = `#${value}`;
    }

    if(regex.test(newValue) || value === '') {
      setCardColor(newValue);
    }
  };

  const handleSpendLimit = e => {
    e.preventDefault();

    const { value } = e.target;
    let numberOnly = value.replace(/\./g, '');

    if(numberOnly[0] === '0'){
      numberOnly = numberOnly.split('');
      numberOnly.splice(0, 1);
      numberOnly = numberOnly.join('');
    }

    const isNumber = /^[\d]+$/.test(numberOnly);

    if(isNumber || !numberOnly) {
      setSpendLimit(currencyFormat(numberOnly));
    }
  };

  const handleClose = () => {
    handleResetData();
    onClose();
  };

  const handleSubmit = e => {
    e.preventDefault();

    if(cardName !== '' && color.length >= 4){
      setNewCard({
        card_name: cardName,
        card_last_four: Math.floor(1000 +   Math.random() * 9000).toString(),
        "expiry" : moment().add(Math.floor(Math.random() * 13), 'months').add(5, 'years').format('M/YYYY'),
        "color" : color.replace('#', '')
      });

      handleClose();
    }
  };

  return (
    <Modal
      title="Add New Card"
      {...props}
      onClose={handleClose}
      width={480}
      height={320}
    >
      <form className="card-form-modal form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-input">
            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardName}
              onChange={e => {
                const { value } = e.target;
                setCardName(value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-input-group">
            <div className="form-input">
              <input type="text" placeholder="Color (ex: #0000FF)" onChange={handleSetColor} value={color}/>
            </div>
            <div className="color-picker" style={{backgroundColor: color}}/>
          </div>
        </div>
        <div className="form-group">
          <div className="form-input-group">
            <label className="currency" htmlFor="spend-limit">IDR</label>
            <div className="form-input flex-1">
              <input id="spend-limit" type="text" placeholder="Spend Limit" value={spendLimit} onChange={handleSpendLimit}/>
            </div>
          </div>
        </div>
        <div className="form-footer">
          <button className="button danger" type="button" onClick={handleClose}>Cancel</button>
          <button className="button info" type="submit">Save</button>
        </div>
      </form>
    </Modal>
  );
};

CardForm.propTypes = {
  onClose: pt.func.isRequired
};

export default CardForm;