<template>
  <div v-bind:class="getClassList()">
    <div v-for="item in list" v-bind:key="item.id + item.type" class="container">
      <div class="item">
        <div v-bind:class="getClassIcon(item)"></div>
        <IconFolder v-if="item.type === 'directory'" class="item__preview"/>
        <IconFile v-else class="item__preview"/>
        <div class="item__name">{{ item.name }}</div>
        <IconPencil class="item__update" v-on:click="onUpdate(item)"/>
        <IconTrash class="item__remove" v-on:click="onConfirmRemove(item)"/>
      </div>
      <Tree
        v-bind:list="item.childs"
        v-bind:level="level + 1"
        v-on:update="update"
        v-on:remove="remove"
      />
    </div>
  </div>
</template>

<script>
import IconPencil from '@/components/icons/IconPencil.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconFolder from '@/components/icons/IconFolder.vue'
import IconFile from '@/components/icons/IconFile.vue'
import { prepareEntity } from '@/helpers/common'

export default {
  name: 'Tree',
  props: {
    list: {
      type: Array,
      default: []
    },
    level: {
      type: Number,
      default: 1
    }
  },
  methods: {
    getClassIcon (item) {
      return {
        item__icon: true,
        item__icon_dir: item.type === 'directory',
        item__icon_file: item.type === 'file'
      }
    },
    getClassList () {
      return {
        list: true,
        list_padding: this.level > 1
      }
    },
    onUpdate (item) {
      let entity = prepareEntity(item)

      this.update(entity)
    },
    update (item) {
      this.$emit('update', item)
    },
    onConfirmRemove (item) {
      let entity = prepareEntity(item)

      if (confirm('Вы подтверждаете удаление?')) this.remove(entity)
    },
    remove (item) {
      this.$emit('remove', item)
    }
  },
  components: {
    IconPencil,
    IconTrash,
    IconFolder,
    IconFile
  }
}
</script>

<style scoped src="@/assets/btn.css"></style>
<style scoped>
  .list_padding {
    margin-left: 8px;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 2px 5px;
  }

  .item:hover {
    background: #eee;
  }

  .item__preview {
    margin-right: 10px;
  }

  .item__name {
    margin-right: 10px;
  }

  .item__update {
    margin-left: auto;
    cursor: pointer;
  }

  .item__remove {
    margin-left: 10px;
    cursor: pointer;
  }

  .item__update:hover,
  .item__remove:hover {
    opacity: 0.6;
  }
</style>
