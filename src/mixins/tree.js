export const mixinTree = {
  computed: {
    tree () {
      let data = this.$store.getters['directories/getList'].concat(this.$store.getters['files/getList'])
      let tree = []
      let link = {
        0: tree
      }

      for (let doc of data) {
        let item = { ...doc, childs: [] }

        if (!link[doc.parent_id]) {
          link[doc.parent_id] = []
        }

        link[doc.parent_id].push(item)

        if (!link[doc.id]) {
          link[doc.id] = item.childs
        }
      }

      return tree
    }
  }
}
