const defaultStruct = {
  id: 0,
  parent_id: 0,
  name: '',
  type: 'file'
}

export function getDefaultStructFile() {
  return { ...defaultStruct }
}

export function filesAdapter(data) {
  return data.map(data => fileAdapter(data))
}

export function fileAdapter(data) {
  return {
    id: data.id,
    parent_id: data.parent_id,
    name: data.name,
    type: 'file'
  }
}