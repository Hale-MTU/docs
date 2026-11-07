import type { MetaRecord } from 'nextra'

// The navbar: the Hale docs home and one entry per app. Each app's folder
// holds its own sidebar.
export default {
  index: {
    title: 'Home',
    type: 'page'
  },
  openvitals: {
    title: 'OpenVitals',
    type: 'page'
  },
  openwatch: {
    title: 'OpenWatch',
    type: 'page'
  },
  openbridge: {
    title: 'OpenBridge',
    type: 'page'
  },
  '404': {
    display: 'hidden'
  }
} satisfies MetaRecord
