import React from 'react';

export default class Button extends React.Component {
  render() {
    return (
      <button
        style={{color:'red',backgroundColor:'lime'}} 
        className={this.className('el-button', this.props.type && `el-button--${this.props.type}`)}
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
