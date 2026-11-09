import type { MetaRecord } from 'nextra'

// The navbar: the Hale docs home, one entry per app, and OpenLink, the link
// between OpenVitals and OpenWatch. Each folder holds its own sidebar.
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
  openlink: {
    title: 'OpenLink',
    type: 'page'
  },
  '404': {
    display: 'hidden'
  }
} satisfies MetaRecord
