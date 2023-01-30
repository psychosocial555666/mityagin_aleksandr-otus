import PropTypes from 'prop-types';

export const parametersType = PropTypes.shape({
  price: PropTypes.string,
  priceStep: PropTypes.number,
  minPrice: PropTypes.string,
  maxPrice: PropTypes.string,
  initialPercent: PropTypes.number,
  minInitialPercent: PropTypes.number,
  time: PropTypes.number,
  minTime: PropTypes.number,
  maxTime: PropTypes.number,
  capital: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
  casco: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
  insurance: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
  creditPercent: PropTypes.number,
  minCreditSum: PropTypes.string,
  creditSum: PropTypes.string,
  payment: PropTypes.string,
  income: PropTypes.string,
  isOfferCorrect: PropTypes.bool,
});