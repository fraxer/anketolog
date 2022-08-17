import { createStore } from 'vuex'
import { moduleEntity } from '@/stores/entities.js'
import { mocksDirectories } from '@/mocks/mocks-directories.js'
import { mocksFiles } from '@/mocks/mocks-files.js'

const store = createStore({
  modules: {
    directories: moduleEntity,
    files: moduleEntity
  }
})

mocksDirectories(store)
mocksFiles(store)

export { store }
