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
    console.log('fdgfdg', value);
    import('../util/sourse').then(Element => {
      console.log(Element, 'hhhh');
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
      console.log('pp', args, argv, value);
      const code = transform(`
        class Demo extends React.Component {
          ${value}
        }

        ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))
      `, {
        presets: ['es2015', 'react']
      }).code

      // console.log('ioioio', code);

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
    console.log('kkk', this.description, this.source);
    return (
      <div>
        <div className="source" id={this.playerId} />
        {
          this.state.showBlock && (
            <div>
              {
                this.description && (
                  <div
                    ref="description"
                    className="description"
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
