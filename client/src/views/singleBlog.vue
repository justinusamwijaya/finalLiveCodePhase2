<template>
    <div id="wrapper">
        <div class="button-wrapper" v-if="userId">
            <button v-if="!deletePrompt" @click="editMode = !editMode">{{editMode ? 'Cancel' : 'Update'}}</button>
            <button v-if="!editMode" @click="deletePrompt = !deletePrompt">{{deletePrompt ? 'Cancel' : 'Delete'}}</button>
        </div>
        <h2 v-if="!editMode && !deletePrompt">{{title}}</h2>
        <div v-if="!editMode && !deletePrompt" class="content" v-html="content">
        </div>
        <form @submit.prevent="editBlog()" id="updateForm" v-if="editMode" method="post">
            <input v-model="title" type="text">
            <vue-editor v-model="content"></vue-editor>
            <button type="submit">edit</button>
        </form>
        <div v-if="deletePrompt">
            <h2>Delete data?</h2>
            <button class="deleteBlog" @click="deleteBlog()">yes</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'singleBlog',
  components: { VueEditor },
  data () {
    return {
      userId: false,
      title: '',
      content: '',
      editMode: false,
      deletePrompt: false
    }
  },
  created () {
    axios.get('http://localhost:3000/blogs/' + this.$route.params.id)
      .then(response => {
        this.userId = response.data.result.userId === localStorage.getItem('id')
        this.title = response.data.result.title
        this.content = response.data.result.content
      })
      .catch(errors => {
        console.log(errors.response)
      })
  },
  methods: {
    ...mapActions([
      'getAllBlogs'
    ]),
    editBlog: function () {
      let { title, content } = this
      let updatedBlog = {
        title,
        content
      }
      axios.put('http://localhost:3000/blogs/' + this.$route.params.id, updatedBlog, { headers: { authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(result => {
          this.editMode = false
        })
        .catch(errors => {
          console.log(errors.response)
        })
    },
    deleteBlog: function () {
      axios.delete('http://localhost:3000/blogs/' + this.$route.params.id, { headers: { authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(result => {
          this.getAllBlogs()
          window.location.href = '/'
        })
        .catch(errors => {
          console.log(errors.response)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.deleteBlog{
    width: 40%;
    cursor:pointer;
    height:4rem;
    background:none;
    border:.1rem solid rgba(0,0,0,.1);
    border-radius:1rem;
    &:active, &:focus {
        outline: none;
    }
}
#updateForm{
    input{
        margin-bottom: 3rem;
        width:100%;
        text-align:center;
        padding: 1rem;
        font-size: 2rem;
        border-radius:1rem;
        border:.1rem solid rgba(0,0,0,.1);
        &:active, &:focus {
            outline:none;
        }
    }
    button{
        margin-top: 2rem;
        background:none;
        border:.05rem solid rgba(0,0,0,.1);
        border-radius: 1rem;
        height: 5rem;
        width: 20%;
        font-size:1.6rem;
        cursor: pointer;
        &:active, &:focus {
            outline:none;
        }
    }
}
.button-wrapper{
    width:100%;
    display:flex;
    justify-content: space-around;
    margin-top: 2rem;
    margin-bottom: 4rem;
    button{
        background:none;
        border:.05rem solid rgba(0,0,0,.1);
        border-radius: 1rem;
        height: 5rem;
        width: 20%;
        font-size:1.6rem;
        cursor: pointer;
        &:active, &:focus {
            outline:none;
        }
    }
}
h2{
    margin-bottom: 5rem;
}
#wrapper{
    margin-top:10rem;
    display:flex;
    justify-content:center;
    flex-direction: column;
    align-items: center;
    .content{
        width:80%;
        text-align:left;
        border:1px solid rgba(0,0,0,.1);
        padding:7rem;
        border-radius:2rem;
    }
}

</style>
