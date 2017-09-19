import Component from 'hyper/component'
import React from 'react'
import SvgIcon from '../utils/svg-icon'
import xmit from '../utils/xmit'
import { exec } from 'child_process'

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
            <path d="M1600 1312v-704q0-40-28-68t-68-28h-704q-40 0-68-28t-28-68v-64q0-40-28-68t-68-28h-320q-40 0-68 28t-28 68v960q0 40 28 68t68 28h1216q40 0 68-28t28-68zm128-704v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z" />
          </g>
        </g>
      </SvgIcon>
    )
  }
}

export default class extends Component {
  static displayName() {
    return 'CWD plugin'
  }

  constructor() {
    super()
    this.state = {
      cwd: null,
    }
  }

  componentDidMount() {
    this.props.subscribe(() => {
      if (this.props.pid) this.setCwd(this.props.pid)
    }, 500)
  }

  componentWillReceiveProps(nextProps) {
    const { pid } = nextProps
    if (pid) this.setCwd(pid)
  }

  setCwd(pid) {
    exec(`lsof -p ${pid} | awk '$4=="cwd"' | tr -s ' ' | cut -d ' ' -f9-`, (err, stdout) => {
      if (!err) {
        const cwd = stdout.trim()
        this.setState({ cwd })
        xmit.publish({
          type: 'cwd',
          payload: cwd,
        })
      }
    })
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
    const cwd = (this.state.cwd || '').replace(process.env.HOME, '~')

    return (
      <div className={css('wrapper')}>
        <PluginIcon /> {cwd}
      </div>
    )
  }
}
