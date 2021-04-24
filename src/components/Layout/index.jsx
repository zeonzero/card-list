import React, { useState, useContext } from 'react';
import Slider from 'react-slick';
import cn from 'classnames';
import moment from 'moment';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card from '../Card';
import CardDetail from "../CardDetail";
import CardForm from '../CardForm';

import CardContext from "../../context/cardContext";

import './styles.scss';

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={cn(className, 'prev-next-arrow prev')}
      style={style}
      onClick={onClick}
    >
      <i className="icon-chevron-right"/>
    </div>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={cn(className, 'prev-next-arrow')}
      style={style}
      onClick={onClick}
    >
      <i className="icon-chevron-right"/>
    </div>
  );
}


const Layout = () => {
  const { cards } = useContext(CardContext);
  const [ isOpenCardForm, setOpenCardForm ] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: cards.length >= 2 ? 2 : cards.length,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>
  };

  const openCardForm = () => {
    setOpenCardForm(!isOpenCardForm);
  };

  return (
    <div className="layout container">
      <main>
        <div className="card-page">
          <div className="card-page-header">
            <h1>Cards</h1>
            <span className="view-all-card">View All <i className="icon-chevron-right" /></span>
          </div>
          <div className="card-page-body">
            <div className="add-new-card" onClick={openCardForm}>
              <div className="add-new-card-icon"><i className="icon-x"/></div>
              <p className="add-new-card-text">Add new card</p>
            </div>
            {isOpenCardForm && <CardForm isOpen={isOpenCardForm} onClose={openCardForm}/>}
            <div className="card-list">
              <Slider {...sliderSettings}>
                {cards.map((item, itemIndex) => {
                  const { card_name, card_last_four, expiry, color } = item;

                  return (
                    <Card
                      key={itemIndex}
                      cardName={card_name}
                      lastFourDigit={card_last_four}
                      expiry={moment(expiry, 'MM/YYYYY')}
                      color={color}
                    />
                  );
                })}
              </Slider>
            </div>
            <CardDetail/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;