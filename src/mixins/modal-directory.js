export const mixinModalDirectory = {
  data () {
    return {
      modalDirectory: {
        show: false,
        state: 'create',
        data: {}
      }
    }
  },
  methods: {
    openModalDirectory (state = 'create', data = {}) {
      if (this.closeAllModals) {
        this.closeAllModals()
      }

      this.modalDirectory.show = true
      this.modalDirectory.state = state
      this.modalDirectory.data = { ...data }
    },
    closeModalDirectory () {
      this.modalDirectory.show = false

      this.resetModalDirectory()
    },
    resetModalDirectory () {
      this.modalDirectory.state = 'create'
      this.modalDirectory.data = {}
    }
  }
}
