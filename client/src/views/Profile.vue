<template>
  <div class="topWrapper">
    <h2 style="margin-left: 5rem;">Blogs by {{userfilter}}</h2>
    <blog v-for="blog in allBlogs" :key="blog._id" :title="blog.title" :content="blog.content" :timeCreated="blog.createdAt" :blogId="blog._id" :blogPict="blog.image" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import blog from '@/components/subComponents/blog.vue'
export default {
  methods: {
    ...mapActions([
      'getUserBlogs'
    ])
  },
  components:{ blog },
  created () {
   this.getUserBlogs(this.$route.params.id)
  },
  mounted () {

  },
  computed:{
    ...mapState([
      'allBlogs',
      'userfilter'
    ])
  }

}
</script>
<style lang="scss" scoped>
.topWrapper{
  margin-top: 15rem;
}
</style>
