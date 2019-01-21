import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import { transform } from 'babel-standalone'

import Editor from './editor'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.playerId = `${parseInt(Math.random() * 1e9).toString(36)}`
    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/)
    this.description = marked(this.document[1])
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/)

    this.state = {
      showBlock: false
    }
  }

  componentDidMount() {
    this.renderSource(this.source[2])
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    })
  }

  renderSource(value) {
    import('../util/source').then(Element => {
      const args = ['context', 'React', 'ReactDOM']
      const argv = [this, React, ReactDOM]

      for (const key in Element) {
        args.push(key)
        argv.push(Element[key])
      }

      return {
        args,
        argv
      }
    }).then(({ args, argv }) => {
      const code = value.includes('render()') ? transform(`
        class Demo extends React.Component {
          ${value}
        }

        ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))
      `, {
        presets: ['es2015', 'react']
      }).code
      : transform(`
        class Demo extends React.Component {
          render() {
            return (
              <div>
                ${value}
              </div>
            )
          }
        }

        ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))
      `, {
        presets: ['es2015', 'react']
      }).code


      args.push(code)

      new Function(...args).apply(null, argv)

      this.source[2] = value
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    })
  }

  render() {
    return (
      <div className="main-panel">
        <div className="main-panel-source" id={this.playerId} />
        {
          this.state.showBlock && (
            <div>
              {
                this.description && (
                  <div
                    ref="description"
                    className="main-panel-description"
                    dangerouslySetInnerHTML={{ __html: this.description }}
                  />
                )
              }
              <Editor
                value={this.source[2]}
                onChange={code => this.renderSource(code)}
              />
            </div>
          )
        }
         <div className="main-panel-control" onClick={this.blockControl.bind(this)}>
          {
            this.state.showBlock ? (
              <span className="btnCur">
                隐藏
              </span>
            ) : (
              <span className="btnCur">
                显示
              </span>
            )
          }
        </div>
      </div>
    )
  }
}

Canvas.propTypes = {
  locale: PropTypes.object
}

Canvas.defaultProps = {
  locale: {}
}
