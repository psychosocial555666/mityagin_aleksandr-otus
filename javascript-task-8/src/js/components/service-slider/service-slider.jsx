import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import bank from "../../../img/piggybank.png";
import appPhone from "../../../img/app-phone.png";
import car from "../../../img/car.png";
import lock from "../../../img/lock.png";
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import SwiperCore, {Pagination, Autoplay, EffectFade} from 'swiper';

SwiperCore.use([Pagination, Autoplay, EffectFade]);

function ServiceSlider() {
  return (
    <section className="services">
      <Swiper className="slider"
        spaceBetween={0}
        effect="fade"
        loop={true}
        slidesPerView={1}
        pagination={{
          clickable: false,
          bulletClass: 'services__point',
          bulletActiveClass: 'services__point--active',
        }}
      >
        <SwiperSlide>
        <article className="services__item service">
          <div className="service__content">
            <h3>Вклады Лига Банка – это выгодная инвестиция в свое будущее</h3>
            <ul className="service__list">
              <li className="service__item">Проценты по вкладам до 7%</li>
              <li className="service__item">Разнообразные условия</li>
              <li className="service__item">Возможность ежемесячной капитализации или вывод процентов на банковскую карту</li>
            </ul>
            <a href="#more" className="service__button button">Узнать подробнее</a>
          </div>
          <div className="service__image service__image--1">
            <img src={bank} alt="Вклады Лига Банка" width="440" height="290"/>          
          </div>
        </article>
        </SwiperSlide>
        <SwiperSlide>
        <article className="services__item service">
          <div className="service__content">
            <h3>Лига Банк выдает кредиты под любые цели</h3>
            <ul className="service__list">
              <li className="service__item">Ипотечный кредит</li>
              <li className="service__item">Автокредит</li>
              <li className="service__item">Потребительский кредит</li>
            </ul>
            <p className="service__description">
              Рассчитайте ежемесячный платеж <br />
              и ставку по кредиту воспользовавшись нашим <a href="#calculator">кредитным калькулятором</a>
            </p>
          </div>
          <div className="service__image service__image--2">
            <img src={car} alt="Кредиты Лига Банка" width="440" height="290"/>
          </div>
        </article>
        </SwiperSlide>
        <SwiperSlide>
        <article className="services__item service">
          <div className="service__content">
            <h3>Лига Страхование — застрахуем все что захотите</h3>
            <ul className="service__list">
              <li className="service__item">Автомобильное страхование</li>
              <li className="service__item">Страхование жизни и здоровья</li>
              <li className="service__item">Страхование недвижимости</li>
            </ul>
            <a href="#more" className="service__button button">Узнать подробнее</a>
          </div>
          <div className="service__image service__image--3">
            <img src={lock} alt="Страхование Лига Банка" width="440" height="290"/>         
          </div>
        </article>
        </SwiperSlide>
        <SwiperSlide>
        <article className="services__item service">
          <div className="service__content">
            <h3>Лига Банк — это огромное количество онлайн-сервисов для вашего удобства</h3>
            <ul className="service__list">
              <li className="service__item">Мобильный банк, <br/> который всегда под рукой</li>
              <li className="service__item">Приложение Лига-проездной <br className="mobile-only"/> позволит <br className="desktop-only"/> <br className="tablet-only"/> вам оплачивать билеты по всему миру</li>
            </ul>
            <a href="#more" className="service__button button">Узнать подробнее</a>
          </div>
          <div className="service__image service__image--4">
            <img src={appPhone} alt="Вклады Лига Банка" width="440" height="290"/>          
          </div>
        </article>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default ServiceSlider;