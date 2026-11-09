import type { MetaRecord } from 'nextra'

// The OpenWatch sidebar. Pages ported from the OpenWatch repository (watches,
// wear-os-sideload, permissions, privacy, releases, developers) say so at the
// bottom and are kept in step with it.
export default {
  index: 'Overview',
  install: 'Install',
  '---devices': {
    type: 'separator',
    title: 'Devices'
  },
  watches: 'Watches',
  'wear-os-sideload': 'Install The Wear OS App',
  scale: 'Xiaomi S400 Scale',
  '---app': {
    type: 'separator',
    title: 'App'
  },
  'connected-apps': 'Connected Apps',
  permissions: 'Permissions',
  privacy: 'Privacy',
  releases: 'Releases',
  developers: 'Developers'
} satisfies MetaRecord
