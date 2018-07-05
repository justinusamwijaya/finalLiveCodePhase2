<template>
    <b-navbar id="navbar">
        <b-navbar-brand>
            <router-link id="brand" :to="{path:'/'}">JustBlog</router-link >
        </b-navbar-brand>
        <div id="right-menu">
            <a v-if="!$store.state.loggedIn" @click="showLoginModal = !showLoginModal">Login</a>
            <router-link :to="{path:'/profile'}" tag="a" v-if="$store.state.loggedIn" >{{loggedUsername}}</router-link >
            <a v-if="$store.state.loggedIn" @click="logout()">logout</a>
        </div>
        <div v-if="showLoginModal && !$store.state.loggedIn" id="loginModal" class="card">
            <a id="closeModal" @click="showLoginModal = !showLoginModal">x</a>
            <form v-if="loginModal" @submit="login($event)" method="post">
                <label>username</label>
                <input v-model="userLogin" type="text">
                <label>password</label>
                <input v-model="passwordLogin" type="password">
                <button type="submit">Login now</button>
            </form>
            <form v-else @submit="signup($event)" method="post">
                <label>username</label>
                <input v-model="usernameSignup" type="text">
                <label>email</label>
                <input v-model="emailSignup" type="text">
                <label>password</label>
                <input v-model="passwordSignup" type="password">
                <button type="submit">Signup</button>
            </form>
            {{loginModal ? "don't have an account yet?" : "already have an account?"}} <a @click="loginModal=!loginModal">{{loginModal ? "signup now" : "login now"}}</a>
        </div>
    </b-navbar>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      showLoginModal: false,
      loginModal: true,
      userLogin: '',
      passwordLogin: '',
      usernameSignup: '',
      emailSignup: '',
      passwordSignup: '',
      loggedUsername: localStorage.getItem('username')
    }
  },
  created () {
  },
  computed: {
    ...mapState([
    ])
  },
  methods: {
    ...mapActions([
    ]),
    login: function (event) {
      event.preventDefault()
      let userLogin = {
        user: this.userLogin,
        password: this.passwordLogin
      }
      axios.post('http://localhost:3000/login', userLogin)
        .then(result => {
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('username', result.data.username)
          localStorage.setItem('id', result.data.id)
          this.loggedUsername = localStorage.getItem('username')
          this.$store.state.loggedIn = true
          this.showLoginModal = false
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    signup: function (event) {
      event.preventDefault()
      let userSignup = {
        username: this.usernameSignup,
        email: this.emailSignup,
        password: this.passwordSignup
      }
      axios.post('http://localhost:3000/signup', userSignup)
        .then(result => {
          this.loginModal = true
          this.userLogin = this.usernameSignup
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    logout: function () {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('id')
      window.location.href = '/'
      this.$store.state.loggedIn = false
    }
  }
}
</script>
<style lang="scss" scoped>
$primaryColor: #ffc700;
#navbar{
    background-color:$primaryColor;
}
button:active, button:focus{
    outline:none;
}
#navbar{
    position:relative;
    #brand{
        color:white;
        cursor: pointer;
        font-size:4rem;
        &:hover{
            text-decoration: none;
        }
    }
    #right-menu{
        position:absolute;
        right:10%;
        top:0;
        display:flex;
        width: 10%;
        justify-content: space-around;
        align-items: center;
        height:100%;
        a, button{
            color:white;
            cursor: pointer;
            &:hover{
                text-decoration: none;
                color:rgba(255,255,255,.5)
            }
            &:active,&:focus{
                outline:none;
            }
        }
        button{
            font-size: 1.7rem;
            margin-right: .5rem;
            margin-left: .5rem;
        }
    }
    #loginModal{
        border-radius:2rem;
        font-size: 2rem;
        text-align:center;
        position:fixed;
        width: 40rem;
        min-height:60rem;
        top: 5rem;
        right: 8%;
        background-color:rgba(255,255,255,1);
        border:0;
        padding: 3rem;
        display:flex;
        justify-content: space-between;
        align-items: center;
        #closeModal{
            position:absolute;
            top:1rem;
            right:2rem;
        }
        a, button{
            color:rgba(0,0,0,.5);
            cursor: pointer;
            &:hover{
                text-decoration: none;
                color:rgba(0,0,0,.2)
            }
            &:active,&:focus{
                outline:none;
            }
        }
        form{
            label{
                width:100%;
            }
            input{
                font-size: 1.2rem;
                margin-top:2rem;
                margin-bottom:2rem;
                width:100%;
                padding:1rem;
                border-radius: 1.2rem;
                border:1px solid rgba(0,0,0,.2);
                &:active, &:focus{
                    outline:none;
                }
            }
            button{
                margin-bottom:2rem;
                border:0;
                background:none;
                cursor: pointer;
                color:rgba(0,0,0,.5);
                &:hover{
                    color:rgba(0,0,0,.2);
                }
                &:active,&:focus{
                    outline:none;
                }
            }
        }
    }
}
@media screen and (max-width:1000px){
    #right-menu{
        width:20% !important;
    }
}
@media screen and (max-width:768px){
    #right-menu{
        width:25% !important;
        a{
            font-size: 1.2rem !important;
        }  
    }
}
</style>
