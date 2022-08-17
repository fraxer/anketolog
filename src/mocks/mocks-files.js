import { fileAdapter } from '@/adapters/files'

export const mocksFiles = (store) => {
  store.state.files.list.push(fileAdapter({
    id: 1,
    parent_id: 2,
    name: 'File 1-1-1'
  }))

  store.state.files.list.push(fileAdapter({
    id: 2,
    parent_id: 1,
    name: 'File 1-2'
  }))

  store.state.files.list.push(fileAdapter({
    id: 3,
    parent_id: 3,
    name: 'File 2-2'
  }))

  store.state.files.list.push(fileAdapter({
    id: 4,
    parent_id: 0,
    name: 'File 2'
  }))
}
