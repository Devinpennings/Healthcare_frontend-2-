<template>
  <div class="patientChat chat" v-if="chat != undefined">
    <div class="bar">
      <div class="status">
        <div v-if="chat.patient.status=='online'" id="online"> </div>
        <div v-else id="offline"> </div>
      </div>
      <div class="name">
        {{ chat.doctor.firstname }} {{ chat.doctor.lastname }} 
      </div>
      <br>
    </div>

    <div class="messagesWrapper">
      <div class="messages" ref="mess">
        <div v-for="message in chat.messages">
            <div class="bubbleme" v-if="message.sender.user_id==user.user_id"> 
              <img v-if="message.type==='image'" height="150" v-bind:src="message.message">
              <div v-else>{{ message.message }} </div>
            </div>
            <div class="bubbleyou" v-else> 
              <img v-if="message.type==='image'" height="150" v-bind:src="message.message">
              <div v-else>{{ message.message }} </div>
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
      image: null
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
    processFile(event) {

      var fr = new FileReader();
      var self = this;

      fr.addEventListener("load", function(e) {
        self.image = e.target.result;
        self.messageGo();
      }); 

      fr.readAsDataURL( event.target.files[0] );

    },
    messageGo() {
      var message = this.message;
      var type = 'message';

      if(this.image != null){
        message = this.image;
        type = 'image';
      }

      console.log(message);

      this.chatSession.socket.emit('sent_message', {
          sender: this.user,
          chatId: this.chatId,
          message: message,
          type: type,
      })
      this.message = '';
      this.image = null;
      setTimeout(() => { 
        var elem = this.$refs.mess;
        elem.scrollTop = elem.scrollHeight; 
      }, 200);
    }
  },

  created() {

    if(this.$store.getters.chatSession == undefined){
      this.$store.dispatch('setupSockets', this.user)
    }

    var intervalID = window.setInterval(() => {
      var elem = this.$refs.mess;
      if(elem.scrollTop + 330 > elem.scrollHeight || this.pChatId != this.prevChatId){
        this.prevChatId = this.pChatId;
        elem.scrollTop = elem.scrollHeight; 
      }
    }, 200);

    // if(this.chat != undefined && this.chat.messages.length != 0){
    //   this.chat.messages.foreach(message => {
    //     message.read = true
    //   });
    // }
  },
}
</script>