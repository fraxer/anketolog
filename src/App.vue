<template>
  <div class="container">
    <header class="header">
      <button class="btn btn-primary" v-on:click="createDirectory">Создать документ</button>
      <button class="btn btn-primary" v-on:click="createFile">Создать файл</button>
    </header>

    <main class="main">
      <Tree
        v-bind:list="tree"
        v-bind:level="1"
        v-on:update="updateEntity"
        v-on:remove="removeEntity"
      />
    </main>
  </div>

  <ModalDirectory
    v-if="modalDirectory.show"
    v-bind:state="modalDirectory.state"
    v-bind:data="modalDirectory.data"
    v-on:confirm="processDirectory"
    v-on:cancel="closeModalDirectory"
  />

  <ModalFile
    v-if="modalFile.show"
    v-bind:state="modalFile.state"
    v-bind:data="modalFile.data"
    v-on:confirm="processFile"
    v-on:cancel="closeModalFile"
  />
</template>

<script>
import ModalDirectory from '@/components/ModalDirectory.vue'
import ModalFile from '@/components/ModalFile.vue'
import Tree from '@/components/Tree.vue'

import { mixinModalDirectory } from '@/mixins/modal-directory'
import { mixinModalFile } from '@/mixins/modal-file'
import { mixinTree } from '@/mixins/tree'

import { getDefaultStructDirectory, directoriesAdapter } from '@/adapters/directories'
import { getDefaultStructFile, filesAdapter } from '@/adapters/files'
import { prepareEntity } from '@/helpers/common'

export default {
  mixins: [
    mixinModalDirectory,
    mixinModalFile,
    mixinTree
  ],
  methods: {
    createDirectory () {
      this.openModalDirectory('create', getDefaultStructDirectory())
    },
    updateDirectory (data) {
      this.openModalDirectory('update', data)
    },
    removeDirectory (id) {
      this.$store.commit('directories/removeItem', id)

      let childDirectories = this.$store.getters['directories/getListByParentId'](id)
      let childFiles = this.$store.getters['files/getListByParentId'](id)
      let storeEntities = childDirectories.concat(childFiles)

      for (let item of storeEntities) {
        let entity = prepareEntity(item)

        this.removeEntity(entity)
      }
    },
    processDirectory (directory) {
      this.saveDirectory(directory)
      this.closeModalDirectory()
    },
    saveDirectory (directory) {
      if (!directory.id) {

        directory.id = this.$store.getters['directories/getCount'] + 1

        this.$store.commit('directories/createItem', directory)
      } else {
        this.$store.commit('directories/updateItem', directory)
      }
    },
    createFile () {
      this.openModalFile('create', getDefaultStructFile())
    },
    updateFile (data) {
      this.openModalFile('update', data)
    },
    removeFile (id) {
      this.$store.commit('files/removeItem', id)
    },
    processFile (directory) {
      this.saveFile(directory)
      this.closeModalFile()
    },
    saveFile (directory) {
      if (!directory.id) {

        directory.id = this.$store.getters['files/getCount'] + 1

        this.$store.commit('files/createItem', directory)
      } else {
        this.$store.commit('files/updateItem', directory)
      }
    },
    closeAllModals () {
      this.closeModalDirectory()
      this.closeModalFile()
    },
    updateEntity (entity) {
      let methodType = this.upFirstLetter(entity.type)
      let storeEntity = this['getEntity' + methodType](entity.id)
      let functionName = 'update' + methodType

      if (!storeEntity) return

      this[functionName](storeEntity)
    },
    getEntityDirectory (id) {
      return this.$store.getters['directories/getItemById'](id)
    },
    getEntityFile (id) {
      return this.$store.getters['files/getItemById'](id)
    },
    removeEntity (entity) {
      let methodType = this.upFirstLetter(entity.type)
      let functionName = 'remove' + methodType

      this[functionName](entity.id)
    },
    upFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  components: {
    ModalDirectory,
    ModalFile,
    Tree
  }
}
</script>

<style scoped src="@/assets/btn.css"></style>
<style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
  }

  .header {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }

  .btn {
    margin-right: 10px;
  }
</style>
