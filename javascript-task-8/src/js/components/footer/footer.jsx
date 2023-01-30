/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logo from "../../../img/logo.svg";
import fb from "../../../img/fb.svg";
import inst from "../../../img/inst.svg";
import twitter from "../../../img/twitter.svg";
import youtube from "../../../img/youtube.svg";
import {menuItems} from "../../const";

function Footer() {
  return (
    <React.Fragment>
      <footer className="page-footer">
        <div className="container">
          <div className="page-footer__content">
            <div className="page-footer__menu">
              <img src={logo} alt="Логотип Лига Банк" className="page-footer__logo" width="149" height="25"/>
              <nav className="page-footer__nav">
                <ul className="page-footer__list">
                  {menuItems.map((item, i) => {
                    return (
                    <li key={i} className="page-footer__item">
                      <a href="#" className="page-footer__link">{item}</a>
                    </li>
                    )
                  })}
                </ul>
              </nav>
              <p>150015, г. Москва, ул. Московская, д. 32 <br/>
                Генеральная лицензия Банка России №1050 <br/>
                Ⓒ Лига Банк, 2019</p>
            </div>
            <div className="page-footer__info info">
              <div className="info__item info__item--ussd">
                <a href="tel:*0904">*0904</a>
                <p>Бесплатно для абонентов <br/> МТС, Билайн, Мегафон, Теле2</p>
              </div>
              <div className="info__item info__item--tel">
                <a href="tel:+78001112233">8 800 111 22 33</a>
                <p>Бесплатный для всех <br/> городов России</p>
              </div>
              <ul className="info__socials socials">
                <li className="socials__item">
                  <a href="#" className="socials__link">
                    <span className="visually-hidden">
                      Facebook
                    </span>
                    <img src={fb} alt="Facebook"/>
                  </a>
                </li>
                <li className="socials__item">
                  <a href="#" className="socials__link">
                    <span className="visually-hidden">
                      Instagram
                    </span>
                    <img src={inst} alt="Instagram"/>
                  </a>
                </li>
                <li className="socials__item">
                  <a href="#" className="socials__link">
                    <span className="visually-hidden">
                      Twitter
                    </span>
                    <img src={twitter} alt="Twitter"/>
                  </a>
                </li>
                <li className="socials__item">
                  <a href="#" className="socials__link">
                    <span className="visually-hidden">
                      Youtube
                    </span>
                    <img src={youtube} alt="Youtube"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;