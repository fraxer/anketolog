export const mixinModalFile = {
  data () {
    return {
      modalFile: {
        show: false,
        state: 'create',
        data: {}
      }
    }
  },
  methods: {
    openModalFile (state = 'create', data = {}) {
      if (this.closeAllModals) {
        this.closeAllModals()
      }

      this.modalFile.show = true
      this.modalFile.state = state
      this.modalFile.data = { ...data }
    },
    closeModalFile () {
      this.modalFile.show = false

      this.resetModalFile()
    },
    resetModalFile () {
      this.modalFile.state = 'create'
      this.modalFile.data = {}
    }
  }
}
