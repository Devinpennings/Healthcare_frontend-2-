<template>
  <section class="forms">
    <div class="loader" v-if="isBusy" ><loader></loader></div>
    <div v-if="!isBusy">
      <div class="dashboardContentForms">
        <div class="container">
          <!-- Page Header-->
          <header>
            <h1 class="h3 display">Creëren</h1>
          </header>
        </div>
        <div class="card-body">
          <form class="form-horizontal">
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Email</label>
              <div class="col-sm-10">
                <input type="text" placeholder="Email" v-model="email" v-on:keyup="checkForm" class="form-control">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Naam</label>
              <div class="col-sm-10">
                <input type="text" placeholder="Naam" v-model="name" v-on:keyup="checkForm" class="form-control">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Achternaam</label>
              <div class="col-sm-10">
                <input type="text" placeholder="Achternaam" v-model="lname" v-on:keyup="checkForm" class="form-control">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Geslacht</label>
              <div class="col-sm-10">
                <label>
                  <select v-model="geslacht">
                    <option v-for="option in options" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </label>
              </div>
            </div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Adres</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-md-4">
                    <input type="text" placeholder="Postcode" v-model="zipcode" v-on:keyup="checkForm" @keydown.tab="getAddress" class="form-control">
                  </div>
                  <div class="col-md-3">
                    <input type="number" placeholder="Huisnummer" v-model="housenumber" v-on:keyup="checkForm" @keydown.tab="getAddress" class="form-control">
                  </div>
                  <div class="col-md-4">
                    <input type="text" placeholder="Straat" v-model="street" v-on:keyup="checkForm" class="form-control" disabled>
                  </div>
                  <div class="col-md-4">
                    <input type="text" placeholder="Plaats" v-model="city" v-on:keyup="checkForm" class="form-control" disabled>
                  </div>
                </div>
              </div>
            </div>
            <div class="line"></div>
            <div class="form-group row">
              <div class="col-sm-4 offset-sm-2">

              </div>
            </div>
          </form>
          <p v-if="errors.length">
            <b>De volgende fouten traden op:</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group row">
            <button class="btn btn-secondary" v-on:click="changeComponent('viewWerknemers')" style="cursor:pointer"><span>Cancel</span></button>
            <div v-if="!errors.length">
              <button class="btn btn-primary" style="vertical-align:middle" v-on:click="update()" ><span>Edit</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
  import Datepicker from "../Datepicker"
  import Loader from '../loader.vue'

    export default {
      name: "updatem",
      props: ['employeeId'],
      components: {
        'loader' : Loader,
        'datepicker': Datepicker
      },

      data() {
        return {
          errors: [],
          isBusy: false,
          employee: this.employeeId,
          name:'',
          lname:'',
          geslacht:'Man',
          email:'',
          password:'',
          city:'',
          zipcode:'',
          street:'',
          housenumber:'',
          options: [
            { text: 'Man', value: 'Man' },
            { text: 'Vrouw', value: 'Vrouw' }
          ]
        }
      },
      created () {
        this.isBusy = true;
        this.$store.dispatch("getRequest", "employees/" + this.employee.user_id).then(response => {
          this.employee = response;
          this.name = this.employee.firstname;
          this.lname = this.employee.lastname;
          this.birthdate = this.employee.age;
          this.email = this.employee.username;
          this.street = this.employee.street;
          this.housenumber = this.employee.housenumber;
          this.geslacht = this.employee.gender;
          this.city = this.employee.city;
          this.zipcode = this.employee.zipcode;
          this.isBusy = false;
        });
      },
      methods: {
        update() {
          this.$store.dispatch('postRequest', {
            url:'doctors/update/' + this.user.user_id,
            body:{
              firstname: this.name,
              lastname: this.lname,
              age: this.birthdate,
              username: this.email,
              street: this.street,
              housenumber: this.housenumber,
              zipcode: this.zipcode,
              city: this.city,
              gender: this.geslacht,
              username: this.email
            }
          }).then(() => {
            this.changeComponent("viewemp")
          });
        },
          changeComponent (component) {
            this.$parent.changeComponent(component);
          },
        checkForm:function(e) {
          this.errors = [];
          console.log(this.firstname);
          if(!this.email || !this.password || !this.name || !this.lname || !this.birthdate || !this.street || !this.number) {
            this.errors.push("Alle velden moeten ingevoerd worden");
          } else if(!this.validEmail(this.email)) {
            this.errors.push("Voer een geldig E-mail adres in");
          }
          if(!this.errors.length) return true;
          e.preventDefault();

        },
        validEmail:function(email) {
          let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        }
        },
        mounted() {
          this.$store.dispatch("getRequest", 'admins').then((response) => {
            this.employees = response
            console.log(this.employees)
          });
        },
    }
</script>

<style scoped>

</style>
