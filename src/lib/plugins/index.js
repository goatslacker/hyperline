import Battery from './battery'
import CWD from './cwd'
import Cpu from './cpu'
import Git from './git-status'
import Hostname from './hostname'
import Network from './network'
import Time from './time'
import Weather from './weather'

export default {
  left: [
    Hostname,
    CWD,
//    Git,
  ],
  center: [
  ],
  right: [
    Cpu,
    Network,
    Battery,
//    Weather,
    Time,
  ],
}
