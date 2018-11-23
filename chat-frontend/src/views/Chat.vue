<template>
  <div class="chat">
    <div class="chat-body">
          <div class="user-name">
       <div class="name-item" id="name-lable"><label>Your username</label></div>
       
       <div class="name-item"><b-form-input v-model="username"
                  type="text"
                  placeholder="Enter your name"></b-form-input></div>
        
        </div>
        <div class="dialog-and-users">
          <div class="dialog">
            <div class = "mes" :key="message.id" v-for='message in messages' show>
              {{message.username}} {{message.text}}
            </div>

          </div>
           <div class="users">
             <b-list-group>
               <b-list-group-item button :key="userOnline.id" v-for='userOnline in usersOnline' show>{{userOnline.username}}</b-list-group-item>
               
             </b-list-group>
            </div>          
         </div>
         <div class="send-mas">
            <div class="sm-f">
             <b-form-textarea id="textarea1"
                     v-model="text"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6">
             </b-form-textarea>
            </div>
            <div class="sm-b"><b-button  variant="primary" @click="sendMessage">
               Send              
            </b-button></div>
              

    </div>
    </div>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex';
export default {
  name: "chat",
  data() {
    return{
      username:'DefaultUser',
      text:''
    }


  },
  computed: {
    ...mapState(['messages']),
    ...mapState(['usersOnline'])
  },
  methods: {
    ...mapActions(['actionSendMessage']),
    sendMessage(){
      const message={
        username: this.username,
        text: this.text
      
      };
 this.actionSendMessage(message);

this.text="";
  },
  ...mapActions(['actionFetchMessages']),
  ...mapActions(['actionGetOnlineUsers']),
  },
mounted() {
    setInterval(() => {
        this.actionFetchMessages()
    }, 5000);
     setInterval(() => {
       const user={username:this.username}
        this.actionGetOnlineUsers(user)
      
    }, 5000)

}

};
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  .chat-body {
    background-color: rgba($color: #ffffff, $alpha: 0.7);
    width: 950px;
    height: 600px;
    border-radius: 12px;
    box-shadow: 0 0 15px darken($color: #ffffff, $amount: 75%);
    display: flex;
    padding: 20px;
    flex-direction: column;

    .user-name {
      display: flex;
      flex-direction: row;
      
      
      justify-content: flex-start;
      .name-item{
        display: flex;
        padding-right: 2%;
      }
      #name-lable{
        display: flex;
        align-self: bottom;
        width: 130px;
        padding-top: 6px;
      }
    }
    .dialog-and-users {
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: flex-start;

     
      .dialog {
        width: 250%;
        height: 400px;
        display: flex;
        background-color: rgba($color: #97a4eb, $alpha: 0.7);
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 5px;
        border-radius: 5px;
        flex-direction: column;
        .mes {
          display: flex;
          margin: 10px;
          align-items:flex-end;
          padding: 10 px;
          
          background-color: rgba($color:  white, $alpha: 0.7);
          
        }
      }
      .users {
        width: 100%;
        margin-top: 5px;
        margin-bottom: 5px;
       // background-color: rgba($color: #4fb4ee, $alpha: 0.7);
        border-radius: 5px;
        align-self: stretch;
        
        
      }
    }
    .send-mas{
       
      
       display: flex;
       flex-direction: row;
       align-items: stretch;
       justify-content: center;

       .sm-f{
         width: 100%;
         padding-right: 1%;
       }
       .sm-b{
        display: flex;
        align-items: stretch;

       }
       
    }
  }
}
</style>
