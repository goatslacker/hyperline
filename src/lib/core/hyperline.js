import React from 'react'
import PropTypes from 'prop-types'
import Component from 'hyper/component'
import decorate from 'hyper/decorate'

class HyperLine extends Component {
  static propTypes() {
    return {
      plugins: PropTypes.array.isRequired
    }
  }

  renderPlugin(css) {
    return (Component, index) => (
      <div key={index} className={css('wrapper')}>
        <Component pid={this.props.pid} />
      </div>
    )
  }

  styles() {
    return {
      line: {
        background: '#272727',
        bottom: 0,
        color: '#d4d4d4',
        display: 'flex',
        fontFamily: 'Operator Mono',
        fontSize: 13,
        fontWeight: 'normal',
        height: 18,
        overflow: 'hidden',
        pointerEvents: 'none',
        position: 'absolute',
        width: '100%',
      },
      left: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
      },
      center: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
      },
      right: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
      },
      wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexShrink: 0,
        paddingLeft: 10,
        paddingRight: 10,
      }
    }
  }

  template(css) {
    const { plugins } = this.props

    return (
      <div className={css('line')} {...this.props}>
        <div className={css('left')}>
          {plugins.left.map(this.renderPlugin(css))}
        </div>
        <div className={css('center')}>
          {plugins.center.map(this.renderPlugin(css))}
        </div>
        <div className={css('right')}>
          {plugins.right.map(this.renderPlugin(css))}
        </div>
      </div>
    )
  }
}

export default decorate(HyperLine, 'HyperLine')
