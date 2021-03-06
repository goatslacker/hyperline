import React from 'react'
import Component from 'hyper/component'
import { networkStats } from 'systeminformation'
import SvgIcon from '../utils/svg-icon'

class PluginIconActive extends Component {
  styles() {
    return {
      'network-icon': {
        fill: '#7ff5ff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g fill="none" fillRule="evenodd">
            <g
              className={css('network-icon')}
              transform="translate(1.000000, 1.000000)"
            >
              <g>
                <path d="M0,10 L7,10 L7,11 L0,11 L0,10 Z M1,11 L6,11 L6,12 L1,12 L1,11 Z M2,12 L5,12 L5,13 L2,13 L2,12 Z M3,13 L4,13 L4,14 L3,14 L3,13 Z M2,3 L5,3 L5,10 L2,10 L2,3 Z" />
                <path d="M8,2 L13,2 L13,3 L8,3 L8,2 Z M9,1 L12,1 L12,2 L9,2 L9,1 Z M10,0 L11,0 L11,1 L10,1 L10,0 Z M7,3 L14,3 L14,4 L7,4 L7,3 Z M9,4 L12,4 L12,11 L9,11 L9,4 Z" />
              </g>
            </g>
          </g>
        </g>
      </SvgIcon>
    )
  }
}

class PluginIconInactive extends Component {
  styles() {
    return {
      'network-icon': {
        fill: '#fff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g fill="none" fillRule="evenodd">
            <g
              className={css('network-icon')}
              transform="translate(1.000000, 1.000000)"
            >
              <g>
                <path d="M0,10 L7,10 L7,11 L0,11 L0,10 Z M1,11 L6,11 L6,12 L1,12 L1,11 Z M2,12 L5,12 L5,13 L2,13 L2,12 Z M3,13 L4,13 L4,14 L3,14 L3,13 Z M2,3 L5,3 L5,10 L2,10 L2,3 Z" />
                <path d="M8,2 L13,2 L13,3 L8,3 L8,2 Z M9,1 L12,1 L12,2 L9,2 L9,1 Z M10,0 L11,0 L11,1 L10,1 L10,0 Z M7,3 L14,3 L14,4 L7,4 L7,3 Z M9,4 L12,4 L12,11 L9,11 L9,4 Z" />
              </g>
            </g>
          </g>
        </g>
      </SvgIcon>
    )
  }
}

export default class Network extends Component {
  static displayName() {
    return 'Network plugin'
  }

  constructor(props) {
    super(props)
    this.state = {
      download: 0,
      upload: 0
    }
  }

  componentDidMount() {
    this.getSpeed()
    this.props.subscribe(() => this.getSpeed(), 2500)
  }

  calculate(data) {
    const rawData = data / 1024
    return (rawData > 0 ? rawData : 0).toFixed()
  }

  getSpeed() {
    networkStats().then(data =>
      this.setState({
        download: this.calculate(data.rx_sec),
        upload: this.calculate(data.tx_sec)
      })
    )
  }

  styles() {
    return {
      wrapper: {
        display: 'flex',
        alignItems: 'center'
      }
    }
  }

  template(css) {
    const { download, upload } = this.state
    return (
      <div className={css('wrapper')}>
        {download > 0 || upload > 0 ? <PluginIconActive /> : <PluginIconInactive />} {download}kB/s {upload}kB/s
      </div>
    )
  }
}
