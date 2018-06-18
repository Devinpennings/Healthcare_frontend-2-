<!--suppress ALL -->
<template>
  <div class="dashboardContentForms">
    <div  class="row">
      <b-table
        show-empty
        :items="items"
        :busy.sync="isBusy"
        :fields="fields"
        :empty-text="'Er zijn geen afspraken'"
      >
        <template slot="patient" slot-scope="row">
          <div v-if="row.item.mappedPatient !== null">{{row.item.mappedPatient.firstname + ' ' + row.item.mappedPatient.lastname}}</div>
          <div v-else>NOTHING</div>
        </template>
        <template slot="actions" slot-scope="row">
          <b-button variant="secondary" size="sm" v-on:click="disapprove(row.item)">
            Verwijderen
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ViewApp",
    props: ['day'],
    data (){
      return{
        user_id: this.$store.getters.user.user_id,
        user: this.$store.getters.user,
        fields: {
          patient: {label: 'Patiënt', sortable: true},
          endTime: {label: 'Tijd', sortable: true},
          note: {label: 'Reden van bezoek'},
          actions: {label: 'Acties'}
        },
        fieldsEmployee:{
          patient: {label: 'Patiënt', sortable: true},
          endTime: {label: 'Tijd', sortable: true},
          note: {label: 'Reden van bezoek'},
        },
        items: [

        ],
        isBusy: false,
        appointments: [],
        selected: null,
        options: [],
      }
    },
    created (){
      this.isBusy = true;
      this.$store.dispatch("getRequest", '/timeslots/approvedPatient?approval=1&patient_id=' + this.user_id).then((response) => {
        this.isBusy = false;
        this.appointments = this.ConvertToDatetime(response);
      });
    },
    methods: {
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
      CompareDates(day,calendarDay){
        let comparer = day.dayClick();
        let comparerm = day.startTime.toString().substring(8,11);
        let calenderm = calendarDay.date.toString().substring(4,7);
        if(calendarDay.monthDay.toString() === comparer && comparerm === calenderm){
          return true;
        }else {
          return false;
        }
      },
      ConvertToDatetime(dateValues) {
        let entryAppointments = dateValues;
        dateValues.forEach(x => {
          let startTimeNew = new Date(x.startTime);
          let endTimeNew = new Date(x.endTime);
          let timeSlotStart = startTimeNew.getUTCHours() + ':' + startTimeNew.getUTCMinutes();
          let timeSlotEnd = endTimeNew.getUTCHours() + ':' + endTimeNew.getUTCMinutes();
          entryAppointments.endTime = timeSlotStart + ' - ' + timeSlotEnd;
          x.endTime = entryAppointments.endTime
        });
        return dateValues;
      },
    },
  }
</script>

<style scoped>

</style>
