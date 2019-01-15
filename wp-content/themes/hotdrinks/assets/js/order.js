new Vue({
    el: '.order',
    data: {
        name: '',
        type: '',
        types: [
            {name: 'Coffee'},
            {name: 'English Tea'},
            {name: 'Green Tea'},
            {name: 'Hot Chocolate'}
        ],
        chocolate: '',
        chocolates: [
            {name: 'Mint Flavour'},
            {name: 'Belgian Flavour'},
            {name: 'Orange Flavour'}
        ],
        milk: '',
        milks: [
            {option: 'with milk'},
            {option: 'without milk'},
            {option: 'with almond milk'}
        ],
        sugar: ''
    },

    methods: {
        shrinkBox() {
            return {
                'order__main-area--shrink': this.name
            }
        },
        exposeOrder() {
            return {
                'order__sidebar--show': this.name
            }
        }
    }
})
