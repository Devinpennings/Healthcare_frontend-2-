<template>
  <div id="parent">
    <patientchat v-if="getActiveUser.type === 'patient'"/>
    <patientchatwindow v-if="openChat && getActiveUser.type === 'patient'" class="chatFloat"/>
    <router-view/>
    <navbar>NOTHING</navbar>
    <sidebar>NOTHING</sidebar>
    <div class="dashboardContent">
      <dossier :patientid="getUser" v-if="openComponent === 'personalDossier'"/>
      <calendar :patientid="getUser" v-if="openComponent === 'calendar'"/>
      <createm v-if="openComponent === 'createWerknemer'"/>
      <createp v-if="openComponent === 'createPatients'"/>
      <updatem :employeeId="getUser"  v-if="openComponent === 'updateWerknemer'"/>
      <updatep :patientId="getUser" v-if="openComponent === 'updatePatient'"/>
      <news v-if="openComponent === 'home'"/>
      <viewemp v-if="openComponent === 'viewWerknemers'"/>
      <viewpat v-if="openComponent === 'viewPatients'"/>
      <appointmentlist :day="getDate" v-if="openComponent === 'appointmentlist'"/>.
      <artsswitch v-if="openComponent === 'artsswitch'"/>
      <doctorchat v-if="openComponent === 'doctorChat'"/>
      <planner v-if="openComponent === 'planner'" class="test-fc" :events="fcEvents"
               first-day='1' locale="nl"
               @changeMonth="changeMonth"
               @eventClick="eventClick"
               @dayClick="dayClick"
               @moreClick="moreClick">
        <template slot="fc-event-card" slot-scope="p">
          <p>{{ p.event.title }}</p>
        </template>
      </planner>
      <checker v-if="openComponent === 'checker'"/>
      <storage v-if="openComponent === 'storage'"></storage>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import Dossier from './Dossier.vue'
import UpdateP from "./UpdateP";
import UpdateM from "./UpdateM";
import CreateM from "./CreateM";
import CreateP from "./CreateP";
import News from './News.vue'
import ViewEmp from './ViewEmp.vue'
import ViewPat from './ViewPat.vue'
import Calendar from './Calendar.vue'
import Planner from './Planner.vue';
import AppointmentChecker from "./AppointmentChecker";
import AppointmentList from "./AppointmentList.vue";
import ArtsSwitch from "./ArtsSwitch.vue";
import DoctorChat from '../chat/DoctorChat.vue';
import PatientChat from '../chat/PatientChat.vue';
import PatientChatWindow from '../chat/PatientChatWindow.vue';


export default {


  name: 'app',
  data() {
    return {
      openComponent: 'home',
      userId: this.$store.getters.user.user_id,
      user: '',
      openChat: false,
      fcEvents: Planner.events,
      day: ''
    }
  },
  components: {
    'calendar': Calendar,
    'navbar' : Navbar,
    'sidebar' : Sidebar,
    'dossier' : Dossier,
    'createm' : CreateM,
    'createp' : CreateP,
    'updatem' : UpdateM,
    'updatep' : UpdateP,
    'news' : News,
    'viewemp' : ViewEmp,
    'viewpat' : ViewPat,
    'planner' : Planner,
    'checker' : AppointmentChecker,
    'appointmentlist' : AppointmentList,
    'artsswitch' : ArtsSwitch,
    'doctorchat' : DoctorChat,
    'patientchat' : PatientChat,
    'patientchatwindow' : PatientChatWindow,

  },
  computed: {
    getUser(){
      return this.user;
    },
    getDate(){
      return this.day;
    },
    getActiveUser(){
      return this.$store.getters.user;
    }
  },
  created(){

  },
  methods: {
    changeComponent (component, user) {
      console.log('Changing component to: ' + component);
      this.openComponent = component;
      if(user === undefined)
      {
        this.user = this.$store.getters.user
      }
      else {
        this.user = user;
      }
    },
    changeComponent2(component) {
      this.openComponent = component;
    },
    changeMonth(start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    dayClick(day, jsEvent) {
      this.day = day._d;
      console.log('Meegegeven datum:');
      console.log(this.day);
      this.changeComponent2('appointmentlist');
      console.log('dayClick', day, jsEvent)
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    },
    toggleChat (){
      this.openChat = !this.openChat
    },
    setupSockets(){
      this.$store.dispatch('setupSockets', this.$store.getters.user)
    }
  },
  created() {
    if(this.$store.getters.user.type == 'doctor'){
      this.setupSockets();
    }
  }
}
</script>

<style>@import"../../assets/style/style.sea.css";</style>
<style>@import"../../assets/style/fontastic.css";</style>
<style>@import"../../assets/style/style.text.css";</style>
<style>@import"../../assets/style/grasp_mobile_progress_circle-1.0.0.min.css";</style>
<style>@import"../../assets/style/style.sea.css";</style>
<style>@import"../../assets/icons-reference/ionicons.css";</style>
<style>@import"../../assets/style/landing.css";</style>

