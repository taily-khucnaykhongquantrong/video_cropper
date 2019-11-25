import React from "react";
import PropTypes from "prop-types";

import s from "./button.module.scss";

const Button = props => {
  const { value, onClick } = props;
  return (
    <div
      className={s.button}
      role="button"
      tabIndex="-1"
      onKeyPress={() => {}}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  value: "",
};

export default Button;
