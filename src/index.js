import React, { Component, PropTypes } from 'react'
import HyperLine from './lib/core/hyperline'
import { getColorList } from './lib/utils/colors'
import hyperlinePlugins from './lib/plugins'

export function reduceUI(state, { type, config }) {
  switch (type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD': {
      return state.set('hyperline', config.hyperline)
    }
    default:
      break
  }

  return state
}

export function mapHyperState(state, map) {
  const { ui: { colors, fontFamily, hyperline } } = state
  const uid = state.sessions.activeUid
  const pid = state.sessions.sessions[uid] && state.sessions.sessions[uid].pid
  return Object.assign({}, map, {
    colors: getColorList(colors),
    fontFamily,
    pid,
    weather: hyperline.weather,
  })
}

export function decorateHyperLine(HyperLine) {
  return class extends Component {
    static displayName() {
      return 'HyperLine'
    }

    static propTypes() {
      return {
        plugins: PropTypes.array.isRequired
      }
    }

    static get defaultProps() {
      return {
        plugins: []
      }
    }

    render() {
      return <HyperLine {...this.props} plugins={hyperlinePlugins} />
    }
  }
}

export function decorateHyper(Hyper) {
  return class extends Component {
    static displayName() {
      return 'Hyper'
    }

    static propTypes() {
      return {
        colors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        fontFamily: PropTypes.string,
        customChildren: PropTypes.element.isRequired
      }
    }

    render() {
      const customChildren = (
        <div>
          {this.props.customChildren}
          <HyperLine
            pid={this.props.pid}
            style={{ fontFamily: this.props.fontFamily }}
            weather={this.props.weather}
          />
        </div>
      )

      return <Hyper {...this.props} customChildren={customChildren} />
    }
  }
}
