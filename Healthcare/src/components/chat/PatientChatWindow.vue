<template>
  <div class="patientChat chat" v-if="chat != undefined">
    <div class="bar">
      <div class="name">
        {{ chat.doctor.firstname }} {{ chat.doctor.lastname }}
      </div>
      <br>
    </div>


    <div class="messagesWrapper">
      <div class="messages" ref="mess">
        <div v-if="fullscreen" v-on:click="hidePicture" id="fullscreenPictureBox">
          <img v-bind:src="image" id="fullscreenPicture">
        </div>
        <div v-for="message in chat.messages">
            <div class="bubbleme" v-if="message.sender.user_id==user.user_id">
              <img v-if="message.type==='image'" height="150" v-bind:src="message.message" v-on:click="showPicture(message.message)">
              <div v-else>{{ message.message }} </div>
              <div class="timeStamp">{{ message.date.toTimeString().split(':')[0]}}:{{message.date.toTimeString().split(':')[1] }}</div>
            </div>
            <div class="bubbleyou" v-else>
              <img  v-if="message.type==='image'" height="150" v-bind:src="message.message" v-on:click="showPicture(message.message)">
              <div v-else>{{ message.message }} </div>
              <div class="timeStamp">{{ message.date.toTimeString().split(':')[0]}}:{{message.date.toTimeString().split(':')[1] }}</div>
            </div>
        </div>
      </div>
    </div>

    <div class="messageBox">
      <b-form-input v-model="message" style="position: absolute; bottom: 35px; width: 96%;"
        type="text"
        placeholder="Stuur een bericht"
        @keydown.native="sendMessage"></b-form-input>
      <input type="file" accept="image/*" @change="processFile($event)">
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      user: this.$store.getters.user,
      message: '',
      chatId: this.$store.getters.user.user_id,
      image: null,
      fullscreen: false,
    }
  },

  computed: {
    chatSession: function () {
    	return this.$store.getters.chatSession;
    },
    chat: function () {
      return this.$store.getters.chatSession.chats[0];
    },
    imageSelected: function (){
      return this.image != null;
    }
  },

  methods: {
    // Methods
    sendMessage(event){
      if(event.keyCode == 13 && (!this.message.length === 0 || this.message.trim())){
        this.messageGo();
      }
    },
    showPicture(picture){
      this.image = picture;
      this.fullscreen = true;
    },
    hidePicture(){
      this.image = null;
      this.fullscreen = false;
    },
    processFile(event) {

      let fr = new FileReader();
      let self = this;

      fr.addEventListener("load", function(e) {
        self.image = e.target.result;
        self.messageGo();
      });

      fr.readAsDataURL( event.target.files[0] );

    },
    messageGo() {
      let message = this.message;
      let type = 'message';

      if(this.image != null){
        message = this.image;
        type = 'image';
      }
      this.chatSession.socket.emit('sent_message', {
          sender: this.user,
          chatId: this.chatId,
          message: message,
          type: type,
      }),
      this.message = '';
      this.image = null;
      var self = this;
      setTimeout(() => {
        var elem = self.$refs.mess;
        elem.scrollTop = elem.scrollHeight;
      }, 200);
    }
  },

  created() {

    if(this.$store.getters.chatSession == undefined){
      this.$store.dispatch('setupSockets', this.user)
    }

    var self = this;
    setTimeout(() => {
      if(this.chat != undefined){
        var elem = self.$refs.mess;
        elem.scrollTop = elem.scrollHeight;
      }
    }, 30);
    
    // let intervalID = window.setInterval(() => {
    //   let elem = this.$refs.mess;
    //   if(elem.scrollTop + 330 > elem.scrollHeight || this.pChatId != this.prevChatId){
    //     this.prevChatId = this.pChatId;
    //     elem.scrollTop = elem.scrollHeight;
    //   }
    // }, 200);

    // if(this.chat != undefined && this.chat.messages.length != 0){
    //   this.chat.messages.foreach(message => {
    //     message.read = true
    //   });
    // }
  },
}
</script>
