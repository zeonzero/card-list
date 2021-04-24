import React, { useContext } from 'react';

import Modal from "../Modal";

import CardContext from "../../context/cardContext";

import './styles.scss';

const CardDetail = props => {
  const { cardDetail, isOpenCardDetail, openCardDetail } = useContext(CardContext);

  const {
    cardName,
    lastFourDigit,
    expiry
  } = cardDetail || {};

  return (
    <Modal
      title="Card Detail"
      isOpen={isOpenCardDetail}
      width={480}
      height={240}
      onClose={openCardDetail}
    >
      <table className="card-detail">
        <tbody>
          <tr className="card-detail-item">
            <td>Card Holder Name</td>
            <td>:</td>
            <td>{cardName}</td>
          </tr>
          <tr className="card-detail-item">
            <td>Card Number</td>
            <td>:</td>
            <td>**** **** **** {lastFourDigit}</td>
          </tr>
          <tr className="card-detail-item">
            <td>Expiry Date</td>
            <td>:</td>
            <td>{expiry?.format('MMMM YYYY')}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default CardDetail;