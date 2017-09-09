import Component from 'hyper/component'
import React from 'react'
import SvgIcon from '../utils/svg-icon'
import os from 'os'

class PluginIcon extends Component {
  styles() {
    return {
      'hostname-icon': {
        fill: '#fff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g
            className={css('hostname-icon')}
            height="179.2"
            width="179.2"
            transform="scale(0.008,0.008) translate(0,180)"
          >
            <path d="M1329 784q47 14 89.5 38t89 73 79.5 115.5 55 172 22 236.5q0 154-100 263.5t-241 109.5h-854q-141 0-241-109.5t-100-263.5q0-131 22-236.5t55-172 79.5-115.5 89-73 89.5-38q-79-125-79-272 0-104 40.5-198.5t109.5-163.5 163.5-109.5 198.5-40.5 198.5 40.5 163.5 109.5 109.5 163.5 40.5 198.5q0 147-79 272zm-433-656q-159 0-271.5 112.5t-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5-112.5-271.5-271.5-112.5zm427 1536q88 0 150.5-71.5t62.5-173.5q0-239-78.5-377t-225.5-145q-145 127-336 127t-336-127q-147 7-225.5 145t-78.5 377q0 102 62.5 173.5t150.5 71.5h854z" />
          </g>
        </g>
      </SvgIcon>
    )
  }
}

export default class HostName extends Component {
  static displayName() {
    return 'Hostname plugin'
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
    const hostname = os.hostname().substr(0, 9)
    const username = process.env.USER
    const en0 = os.networkInterfaces()['en0']
    const ipAddress = (en0 && en0[1] && en0[1].address) || hostname

    return (
      <div className={css('wrapper')}>
        <PluginIcon /> <span className={css('username')}>{username}@</span>
        {ipAddress}
      </div>
    )
  }
}
