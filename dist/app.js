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
    // Computed property to determine the transition class for Pacman
    transitionPacman: function transitionPacman() {
      return this.password_match ? 'pacman-success' : 'pacman-invalid';
    }
  },
  methods: {
    // Method to check if the entered password matches the stored password
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
    // Method to disable input fields based on animation states
    disableInput: function disableInput() {
      return this.animate_pacman || this.animate_ghost;
    },
    // Method to reset the animation and handle login attempts
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

      // Set focus back to the password input after a short delay
      setTimeout(function () {
        return _this.$refs.password.focus();
      }, 100);
    },
    // Method to start the Pacman animation
    runPacman: function runPacman(e) {
      e.preventDefault();
      this.animate_pacman = true;
      this.$refs.start.value = 'Checking...';
    },
    // Method to reset the application state
    startOver: function startOver() {
      this.password_entered = '';
      this.password_tries = 0;
      this.password_match = false;
      this.logged_in = false;
    }
  },
  watch: {
    // Watcher to update password_match when password_entered changes
    password_entered: function password_entered(newPassword) {
      this.password_match = newPassword === this.password_stored;
    }
  },
  mounted: function mounted() {
    // Set focus to the name input when the component is mounted
    this.$refs.name.focus();
  }
});
