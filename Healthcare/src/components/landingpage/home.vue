<template>
<div>
  <div>
      <b-carousel id="carousel1"
                  style="text-shadow: 1px 1px 2px #333;"
                  controls
                  indicators
                  background="#ababab"
                  :interval="4000"
                  img-width="1024"
                  img-height="480"
                  v-model="slide"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
      >

        <!-- Text slides with image -->
        <b-carousel-slide :img-src="require('../../assets/img/ousa-chea-552189-unsplash.jpeg')">
        </b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide :img-src="require('../../assets/img/dan-gold-220226-unsplash.jpeg')">
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide :img-src="require('../../assets/img/jesse-orrico-60373-unsplash.jpeg')">
        </b-carousel-slide>
      </b-carousel>
    </div>
  <div class="container-fluid py-5">
      <div class="row">
          <div class="col-md-2"></div>
          <div class="col">
            <i class="ion-ios-bookmarks"></i>
            <h1 style="color:#666666;">Zonnevelt Huisartsen</h1>
              <hr>
              <p class="lead">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. </p>
          </div>
          <div class="col-md-2"></div>
    </div>
      <div class="row">
              <div class="col-md-2"></div>
              <div class="col">
                  <h1 style="color:#666666;">Praktijkinformatie</h1>
                  <hr>
                <p class="lead">Verder vindt je op onze website alle benodigde informatie bijvoorbeeld voor het maken van een afspraak, maar ook het laatste nieuws van onze praktijk.</p>
                <p class="lead">Je vindt contactinformatie voor het bestellen van herhaalrecepten, informatie over de diverse spreekuren en mogelijkheden voor aanvullende onderzoek.</p>
                <p class="lead">Moet u een medische keuring ondergaan (bijvoorbeeld een rijbewijskeuring), ook hiervoor zijn mogelijkheden bij ons in de praktijk.</p>

              </div>
              <div class="col-md-2"></div>
      </div>
      <div class="row">
          <div class="col-md-2"></div>
          <div class="col">
              <h1 style="color:#666666;">Een afspraak via de website maken</h1>
              <hr>
              <p class="lead">Vanaf heden kunnen alle patiënten zich aanmelden voor de mogelijkheid tot het maken van een afspraak via onze website.</p>
              <p class="lead">Nadat je je hebt aangemeld ontvang je een inlogcode en password om een afspraak te kunnen maken bij je eigen huisarts.</p>
              <p class="lead">Wanneer je nog geen patiënt bij ons bent, maar wel op zoek bent naar een nieuwe huisarts, dan kun je je aanmelden via deze link.</p>
          </div>
          <div class="col-md-2"></div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null,
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  components: {

  }
}
</script>
<style>@import"../../assets/icons-reference/ionicons.css";</style>
