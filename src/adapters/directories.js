const defaultStruct = {
  id: 0,
  parent_id: 0,
  name: '',
  type: 'directory'
}

export function getDefaultStructDirectory() {
  return { ...defaultStruct }
}

export function directoriesAdapter(data) {
  return data.map(data => directoryAdapter(data))
}

export function directoryAdapter(data) {
  return {
    id: data.id,
    parent_id: data.parent_id,
    name: data.name,
    type: 'directory'
  }
}