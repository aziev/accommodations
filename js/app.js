Vue.component('filter-component', {
    template: '#filter',
    props: ['title'],
});

var vm = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue',
        expandPopularAmenities: false,
        expandKitchen: false,
        filterComponent: 'filter',
        filters: {
            amenities: {
                primary: [
                    'Air Conditioner',
                    'Computer',
                    'Elevator',
                    'Free Transportation',
                    'Free wireless internet',
                    'Guarded parking',
                ],
                secondary: [
                    'Hair dryer',
                    'Washing machine',
                    'Vacuum cleaner',
                    'Wireless internet',
                    'Free wireless internet2',
                    'TV (local channels only)',
                ],
            },
            apartment: {
                primary: [
                    'Balcony',
                    'Fireplace',
                    'Floor heating',
                    'Game room',
                    'Terrace',
                ],
            },
            kitchen: {
                primary: [
                    'Blender',
                    'Coffee maker',
                    'Cooking hoob',
                    'Dishwasher',
                    'Freezer',
                    'Fridge',
                ],
                secondary: [
                    'Blender',
                    'Coffee maker',
                    'Cooking hoob',
                    'Dishwasher',
                    'Freezer',
                    'Fridge',
                ],
            },
        },
        tags: [
            'Air Conditioner',
        ],
    },
    methods: {
        toggleExpandState: function(key) {
            this[key] = ! this[key];
        },
    },
});
