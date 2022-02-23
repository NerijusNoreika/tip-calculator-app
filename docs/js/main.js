Vue.createApp({
    data() {
      return {
        bill: '',
        tip: '',
        customTip: '',
        numPeople: '',
        tipPerson: 0,
        tipTotal: 0,
        buttons: [
          {
            id: 0,
            type: 'button',
            value: '5',
            active: false,
          },
          {
            id: 1,
            type: 'button',
            value: '10',
            active: false,
          },
          {
            id: 2,
            type: 'button',
            value: '15',
            active: false,
          },
          {
            id: 3,
            type: 'button',
            value: '25',
            active: false,
          },
          {
            id: 4,
            type: 'button',
            value: '50',
            active: false,
          }
        ]
      }
    },
    methods: {
      applyStyle(id) {
        this.buttons.forEach(button => {
          if (button.id !== id) {
            button.active = false;
          } else {
            button.active = true;
          }
        });
        this.countTip(id);
      },
      countTip(id) {
       this.tip = this.buttons[id].value;
      },
      countCustom(e) {
        this.clearButtonStyles();
        this.tip = e.target.value;
      },
      clearButtonStyles() {
        this.buttons.forEach(button => {
          button.active = false;
        });
      },
      reset() {
        this.tip = '',
        this.bill = '',
        this.numPeople = 1;
        this.customTip = '';
        this.clearButtonStyles();
      },
    },
    computed: {
        computedNumPeople() {
          return this.numPeople === '' ? 1 : this.numPeople;
        },
        resetDisabled() {
          return this.bill == '';
        },
        bill() {
          var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          
          });
          return formatter.format(this.tip);
        },
        tipPerPerson() {
          let result = this.bill * (this.tip / 100) / this.computedNumPeople;
          if (isNaN(result) || !isFinite(result)) {
            return new Number(0).toFixed(2);
          } else {
            return new Number(result).toFixed(2)
          }
        },
        totalPerPerson() {
          let result = (this.bill / this.computedNumPeople) + new Number(this.tipPerPerson);
          if (isNaN(result) || !isFinite(result)) {
            return new Number(0).toFixed(2);
          } else {
            return new Number(result).toFixed(2);
          }
        },
        peopleCountError() {
          return this.numPeople === 0 && this.bill !== '';
        }

    }
  }).mount('#app')