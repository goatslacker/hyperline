import Component from 'hyper/component'
import React from 'react'
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
    const cwd = ''
    // TODO pull this from elsewhere
    if (cwd) {
      getGitBranch(cwd).then(branch => {
        this.setState({ branch })
      })
    }

    // TODO setup listeners
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
    return (
      <div className={css('wrapper')}>
        {this.state.branch}
      </div>
    )
  }
}
