var app = new Vue({
  el: '#app',

  data: {
    form: null,
    response: null
  },

  computed: {
    formattedResponse: function () {
      var r = (this.response && this.response !== '') ? this.response.split(';') : [];
      var s = [];

      for (var i = 0; i < r.length; i++) {
        var p = r[i].split('+');
        s.push({ lemma: p[0], pos: p[1], features: p.slice(2) });
      }

      return s;
    }
  },

  methods: {
    lookup: function () {
      if (this.form !== "") {
        var that = this;
        var req = new XMLHttpRequest();
        req.addEventListener("load", function() {
          that.response = req.responseText;
        });
        req.open("GET", "http://foni.uio.no:9294/" + this.form);
        req.send();
      } else {
        this.response = null;
      }
    }
  }
});
