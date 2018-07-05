<template>
    <b-row>
        <b-col md=8 offset-md=2 cols=12>
            <h2>{{title}}</h2>
            <p>{{createdAt}}</p>
            <div class="content" v-html="content">

            </div>
        </b-col>
    </b-row>
</template>
<script>
export default {
  name: 'blog',
  props: ['title', 'content', 'timeCreated', 'blogId'],
  data () {
    return {
      createdAt: ''
    }
  },
  created () {
    let date = new Date(this.timeCreated)
    this.createdAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
  }
}
</script>
<style lang="scss" scoped>

</style>
