import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
// import './styles.scss';

export default class Button extends React.Component {
  render() {
    return (
      <button
        style={{color:'red',backgroundColor:'lime'}} 
        className={classnames('el-button', this.props.type && `el-button--${this.props.type}`)}
      >
        <span>{this.props.children}</span>
      </button>
    )
  }
}

Button.propTypes = {
  type: PropTypes.string
}

Button.defaultProps = {
  type: 'default'
}
