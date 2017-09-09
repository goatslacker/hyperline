import Battery from './battery'
import CWD from './cwd'
import Git from './git-status'
import Hostname from './hostname'
import Network from './network'
import Time from './time'

export default {
  left: [
    Hostname,
    CWD,
  ],
  center: [
    Git,
  ],
  right: [
    Battery,
    Network,
    Time,
  ],
}
