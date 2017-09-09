import Component from 'hyper/component'
import React from 'react'
import SvgIcon from '../utils/svg-icon'
import cheapStore from '../utils/cheapStore'
import path from 'path'
import { exec } from 'child_process'
import { stat } from 'fs'

function isGit(dir, cb) {
  return new Promise((resolve) => {
    stat(path.join(dir, '.git'), (err) => {
      if (!err) resolve()
    })
  })
}

function getGitBranch(cwd) {
  return isGit(cwd).then(() => {
    return new Promise((resolve) => {
      exec(`git symbolic-ref --short HEAD || git rev-parse --short HEAD`, { cwd }, (err, stdout) => {
        if (!err) resolve(stdout.trim())
      })
    })
  })
}

class PluginIcon extends Component {
  styles() {
    return {
      icon: {
        fill: '#fff',
      },
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g
            className={css('icon')}
            height="179.2"
            width="179.2"
            transform="scale(0.008,0.008) translate(0,180)"
          >
            <path d="M672 1472q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm0-1152q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm640 128q0-40-28-68t-68-28-68 28-28 68 28 68 68 28 68-28 28-68zm96 0q0 52-26 96.5t-70 69.5q-2 287-226 414-67 38-203 81-128 40-169.5 71t-41.5 100v26q44 25 70 69.5t26 96.5q0 80-56 136t-136 56-136-56-56-136q0-52 26-96.5t70-69.5v-820q-44-25-70-69.5t-26-96.5q0-80 56-136t136-56 136 56 56 136q0 52-26 96.5t-70 69.5v497q54-26 154-57 55-17 87.5-29.5t70.5-31 59-39.5 40.5-51 28-69.5 8.5-91.5q-44-25-70-69.5t-26-96.5q0-80 56-136t136-56 136 56 56 136z" />
          </g>
        </g>
      </SvgIcon>
    )
  }
}

export default class GitStatus extends Component {
  static displayName() {
    return 'Git Branch Plugin'
  }

  constructor(props) {
    super(props)

    this.state = {
      branch: null,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setBranch(), 500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  setBranch() {
    const cwd = cheapStore.get('cwd')
    if (cwd) {
      getGitBranch(cwd).then(branch => {
        this.setState({ branch })
      })
    }
  }

  styles() {
    return {
      wrapper: {
        display: 'flex',
        alignItems: 'center',
      },
    }
  }

  template(css) {
    if (!this.state.branch) return null

    return (
      <div className={css('wrapper')}>
        <PluginIcon /> {this.state.branch}
      </div>
    )
  }
}
