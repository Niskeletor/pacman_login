"use strict";

var app = new Vue({
  el: '#app',
  data: {
    animate_ghost: false,
    animate_pacman: false,
    logged_in: false,
    password_entered: '',
    password_invalid: false,
    password_match: false,
    password_stored: 'pacman',
    password_tries: 0
  },
  computed: {
    transitionPacman: function transitionPacman() {
      return this.password_match ? 'pacman-success' : 'pacman-invalid';
    }
  },
  methods: {
    checkPassword: function checkPassword() {
      this.animate_ghost = true;
      this.animate_pacman = false;
      if (this.password_entered !== this.password_stored) {
        this.password_invalid = true;
        this.$refs.start.value = 'Incorrect Password!';
      } else {
        this.$refs.start.value = 'Logging in';
      }
    },
    disableInput: function disableInput() {
      return this.animate_pacman || this.animate_ghost;
    },
    resetAnimation: function resetAnimation() {
      var _this = this;
      this.animate_ghost = false;
      this.password_invalid = false;
      this.password_entered = '';
      this.password_tries++;
      if (this.password_match) {
        this.logged_in = true;
      } else {
        this.$refs.start.value = 'Try Again';
        if (this.password_tries === 2) this.$refs.start.value = 'Try "pacman"';
      }
      setTimeout(function () {
        return _this.$refs.password.focus();
      }, 100);
    },
    runPacman: function runPacman(e) {
      e.preventDefault();
      this.animate_pacman = true;
      this.$refs.start.value = 'Checking...';
    },
    startOver: function startOver() {
      this.password_entered = '';
      this.password_tries = 0;
      this.password_match = false;
      this.logged_in = false;
    }
  },
  watch: {
    password_entered: function password_entered() {
      if (this.password_entered === this.password_stored) this.password_match = true;
    }
  },
  mounted: function mounted() {
    this.$refs.name.focus();
  }
});
