<template>
  <Modal>
    <template #header>
      {{ state === 'create' ? 'Создать' : 'Обновить' }} директорию
    </template>
    <template #default>
      <label class="label">
        <span class="label__name">Название директории</span>
        <input type="text" class="input" v-model="localData.name">
      </label>

      <label v-if="directoriesForSelection.length" class="label">
        <span class="label__name">Родительская директория</span>
        <select class="select" v-model="localData.parent_id">
          <option v-bind:value="0">Корневая директория</option>
          <option v-for="item in directoriesForSelection" v-bind:value="item.id">{{ item.name }}</option>
        </select>
      </label>
    </template>
    <template #footer>
      <button class="btn btn-primary" v-on:click="confirm">{{ state === 'create' ? 'Создать' : 'Сохранить' }}</button>
      <button class="btn btn-cancel" v-on:click="cancel">Отмена</button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import { getDefaultStructDirectory } from '@/adapters/directories'

export default {
  name: 'ModalDirectory',
  props: {
    state: {
      type: String,
      default: 'create'
    },
    data: {
      type: Object,
      default: () => getDefaultStructDirectory()
    }
  },
  data () {
    return {
      localData: getDefaultStructDirectory()
    }
  },
  created () {
    this.localData = { ...this.data }
  },
  computed: {
    directoriesForSelection () {
      return this.$store.getters['directories/getListWithoutId'](this.localData.id)
    }
  },
  methods: {
    confirm () {
      if (!this.localData.name) {
        return alert('Укажите название директории')
      }

      this.$emit('confirm', this.localData)
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  components: {
    Modal
  }
}
</script>

<style scoped src="@/assets/btn.css"></style>
<style scoped src="@/assets/inputs.css"></style>
<style scoped>
  :deep(.modal__window) {
    max-width: 400px;
  }

  :deep(.footer) {
    justify-content: flex-end;
  }

  .btn {
    margin-left: 10px;
  }
</style>
