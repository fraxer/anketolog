import { directoryAdapter } from '@/adapters/directories'

export const mocksDirectories = (store) => {
  store.state.directories.list.push(directoryAdapter({
    id: 1,
    parent_id: 0,
    name: 'Dir 1'
  }))

  store.state.directories.list.push(directoryAdapter({
    id: 2,
    parent_id: 1,
    name: 'Dir 1-1'
  }))

  store.state.directories.list.push(directoryAdapter({
    id: 3,
    parent_id: 0,
    name: 'Dir 2'
  }))

  store.state.directories.list.push(directoryAdapter({
    id: 4,
    parent_id: 3,
    name: 'Dir 2-1'
  }))
}
