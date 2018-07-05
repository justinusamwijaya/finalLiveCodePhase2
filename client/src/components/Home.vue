<template>
  <div class="topWrapper">
    <blog v-for="blog in allBlogs" :key="blog._id" :title="blog.title" :content="blog.content" :timeCreated="blog.createdAt" :blogId="blog._id" :author="blog.author" :blogPict="blog.image"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import blog from './subComponents/blog.vue'
export default {
  data () {
    return {
    }
  },
  components: { blog },
  methods: {
    ...mapActions([
      'getAllBlogs'
    ])
  },
  created () {
   this.getAllBlogs ()
  },
  mounted () {

  },
  computed:{
    ...mapState([
      'allBlogs'
    ])
  }

}
</script>
<style lang="scss" scoped>
.topWrapper{
  margin-top: 15rem;
}
</style>
