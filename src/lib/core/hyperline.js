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
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
        position: 'absolute',
        width: '100%',
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
        {plugins.map((Component, index) => (
          <div key={index} className={css('wrapper')}>
            <Component />
          </div>
        ))}
      </div>
    )
  }
}

export default decorate(HyperLine, 'HyperLine')
