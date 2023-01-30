import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import SwiperCore, {Pagination, Autoplay} from 'swiper';

SwiperCore.use([Pagination, Autoplay]);

function Slider() {

  return (
    <Swiper className="slider"
    spaceBetween={0}
    cssMode={true}
    loop={true}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
    slidesPerView={1}
    pagination={{
      clickable: false,
      bulletClass: 'slider__point',
      bulletActiveClass: 'slider__point--active',
    }}
  >
    <SwiperSlide>
    <article className="slider__item slider__item--slide-one">
      <div className="container slider__wrapper">
        <div className="slider__content">
          <h1>Лига Банк</h1>
          <p>Кредиты на любой случай</p>
          <a href="#calculator" className="slider__button button">Рассчитать кредит</a>
        </div>
      </div>
    </article>
    </SwiperSlide>
    <SwiperSlide>
    <article className="slider__item slider__item--slide-two">
      <div className="container slider__wrapper">
        <div className="slider__content">
          <h1>Лига Банк</h1>
          <p>Ваша уверенность <br className="mobile-only"/> в завтрашнем дне</p>
        </div>
      </div>
    </article>
    </SwiperSlide>
    <SwiperSlide>
    <article className="slider__item slider__item--slide-three">
      <div className="container slider__wrapper">
        <div className="slider__content">
          <h1>Лига Банк</h1>
          <p>Всегда рядом</p>
          <a href="#map" className="slider__button button">Найти отделение</a>
        </div>
      </div>
    </article>
    </SwiperSlide>
  </Swiper>
  );
}

export default Slider;