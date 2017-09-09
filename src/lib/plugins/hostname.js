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
            <path d="M704 1536l96-448-96-128-128-64zm256 0l128-640-128 64-96 128zm160-1010q-2-4-4-6-10-8-96-8-70 0-167 19-7 2-21 2t-21-2q-97-19-167-19-86 0-96 8-2 2-4 6 2 18 4 27 2 3 7.5 6.5t7.5 10.5q2 4 7.5 20.5t7 20.5 7.5 17 8.5 17 9 14 12 13.5 14 9.5 17.5 8 20.5 4 24.5 2q36 0 59-12.5t32.5-30 14.5-34.5 11.5-29.5 17.5-12.5h12q11 0 17.5 12.5t11.5 29.5 14.5 34.5 32.5 30 59 12.5q13 0 24.5-2t20.5-4 17.5-8 14-9.5 12-13.5 9-14 8.5-17 7.5-17 7-20.5 7.5-20.5q2-7 7.5-10.5t7.5-6.5q2-9 4-27zm416 879q0 121-73 190t-194 69h-874q-121 0-194-69t-73-190q0-61 4.5-118t19-125.5 37.5-123.5 63.5-103.5 93.5-74.5l-90-220h214q-22-64-22-128 0-12 2-32-194-40-194-96 0-57 210-99 17-62 51.5-134t70.5-114q32-37 76-37 30 0 84 31t84 31 84-31 84-31q44 0 76 37 36 42 70.5 114t51.5 134q210 42 210 99 0 56-194 96 7 81-20 160h214l-82 225q63 33 107.5 96.5t65.5 143.5 29 151.5 8 148.5z" />
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
