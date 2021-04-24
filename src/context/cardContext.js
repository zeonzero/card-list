import React, { createContext, useState } from 'react';
import pt from 'prop-types';

const CardContext = createContext({
  cards: []
});

export const CardContextProvider = ({children}) => {
  const [ cards, setCards ] = useState( [{"card_name":"Superhuman", "card_last_four":"5139", "expiry" : "03/20206", "color" : "ff0000" }]);
  const [ cardDetail, setCardDetail ] = useState(null);
  const isOpenCardDetail = !!cardDetail;

  const setNewCard = (newCards) => {
    setCards([newCards, ...cards]);
  };

  const openCardDetail = (cardDetail) => {
    if(isOpenCardDetail) {
      setCardDetail(null);
    }else {
      setCardDetail(cardDetail);
    }
  };

  const contextValue = {
    cardDetail,
    cards,
    isOpenCardDetail,
    openCardDetail,
    setNewCard
  };

  return (
    <CardContext.Provider value={contextValue}>
      {children}
    </CardContext.Provider>
  );
};

CardContextProvider.propTypes = {
  children: pt.node.isRequired
};

export default CardContext;