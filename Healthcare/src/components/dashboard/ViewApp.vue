<!--suppress ALL -->
<template>
  <div class="dashboardContentForms">
    <div  class="row">
      <b-table
        show-empty
        :items="appointments"
        :busy.sync="isBusy"
        :fields="fields"
        :empty-text="'Er zijn geen afspraken'"
      >
        <template slot="patient" slot-scope="row">
          <div v-if="row.item.mappedPatient !== null">{{row.item.mappedPatient.firstname + ' ' + row.item.mappedPatient.lastname}}</div>
          <div v-else>NOTHING</div>
        </template>
        <template slot="actions" slot-scope="row">
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
          startTime: {label: 'Datum', sortable: true},
          note: {label: 'Reden van bezoek'},
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
      this.$store.dispatch("getRequest", 'timeslots/approvedPatient?approval=1&patient_id=' + this.user_id).then((response) => {
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
        for (let index = 0; index < entryAppointments.length; ++index) {
          let startTimeNew = new Date( parseFloat( entryAppointments[index].startTime));
          let endTimeNew = new Date( parseFloat( entryAppointments[index].endTime));
          let timeSlotStart = startTimeNew.getUTCHours() + ':' + startTimeNew.getUTCMinutes();
          let timeSlotEnd = endTimeNew.getUTCHours() + ':' + endTimeNew.getUTCMinutes();
          entryAppointments[index].startTime = new Date( parseFloat( entryAppointments[index].startTime)).toDateString();
          entryAppointments[index].endTime = timeSlotStart + ' - ' + timeSlotEnd;
        }
        return entryAppointments;
      },
    },
  }
</script>

<style scoped>

</style>
