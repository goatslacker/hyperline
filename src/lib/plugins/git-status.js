import Component from 'hyper/component'
import React from 'react'
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
        {this.state.branch}
      </div>
    )
  }
}
