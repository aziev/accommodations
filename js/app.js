Vue.component('filter-component', {
    template: '#filter',
    props: ['title'],
});

Vue.component('tab-map', {
    template: '#tab-map',
    props: ['tags'],
    methods: {
        initMap: function() {
            var myLatLng = {lat: 41.3947688, lng: 2.0787284};

            // Create a map object and specify the DOM element for display.
            var map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                scrollwheel: true,
                zoom: 14,
                styles: window.mapStylesConfig,
            });

            var center = [];

            vm.filteredItems().forEach(function(item) {
                var marker = new google.maps.Marker({
                    map: map,
                    position: {
                        lat: item.location[0],
                        lng: item.location[1]
                    },
                    title: item.price.toString(),
                });

                if (center.length) {
                    center[0] = (center[0] + item.location[0]) / 2;
                    center[1] = (center[1] + item.location[1]) / 2;
                } else {
                    center[0] = item.location[0];
                    center[1] = item.location[1];
                }
                
            });

            if (center.length) {
                map.setCenter(new google.maps.LatLng(center[0], center[1]));
            }
        },
    },
    mounted: function(){
        this.initMap();
    },
    watch: {
        tags: function() {
            this.initMap();
        },
    }
});

Vue.component('tab-accomodation', {
    template: '#tab-accomodation',
});

var vm = new Vue({
    el: '#app',
    data: {
        expandPopularAmenities: false,
        expandKitchen: false,
        filterComponent: 'filter',
        currentTab: 'tab-accomodation',
        tagsWidth: 0,
        search: '',
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
        items: [
            {
                desc: 'Stylish apartment in el born',
                price: 85,
                location: [41.393592, 2.162570],
                amenities: [
                    'Guarded parking',
                    'Balcony',
                    'Dishwasher',
                    'Freezer',
                ],
                image: '1.png',
            }, {
                desc: 'A cozy flat near Las Ramblas',
                price: 70,
                location: [41.394195, 2.164844],
                amenities: [
                    'Free wireless internet',
                    'Fireplace',
                ],
                image: '2.png',
            }, {
                desc: 'Apartment in the classic Barcelona center',
                price: 60,
                location: [41.393732, 2.165551],
                amenities: [
                    'Air Conditioner',
                    'Elevator',
                    'Terrace',
                    'Blender',
                    'Fridge',
                ],
                image: '3.png',
            }, {
                desc: 'Classic Eixample place for rent',
                price: 75,
                location: [41.392794, 2.164888],
                amenities: [
                    'Free Transportation',
                    'Guarded parking',
                    'Game room',
                ],
                image: '4.png',
            }, {
                desc: 'Atlantida Beach',
                price: 90,
                location: [41.392876, 2.163260],
                amenities: [
                    'Cooking hob',
                ],
                image: '2.png',
            }, {
                desc: 'Elegant place in Eixample',
                price: 150,
                location: [41.394479, 2.163797],
                amenities: [
                    'Air Conditioner',
                    'Computerr',
                    'Free wireless internet',
                    'Game room',
                    'Terrace',
                    'Fridge',
                ],
                image: '1.png',
            }
        ],
    },
    methods: {
        toggleExpandState: function(key) {
            this[key] = ! this[key];
        },
        removeTag: function(tag) {
            var index = this.tags.indexOf(tag);
            this.tags.splice(index, 1);
        },
        setTab: function(tab) {
            this.currentTab = tab;
        },
        filteredItems: function() {
            var tags_arr = this.tags;
            var search = this.search.toUpperCase();

            if (!tags_arr.length) {
                return this.items;
            }

            return this.items.filter(function(item) {
                var length = tags_arr.length;
                var matches = true;

                for (var i=0; i < length; i++) {
                    if (item.amenities.indexOf(tags_arr[i]) === -1) {
                        matches = false;
                    }
                }

                if (search !== '' && item.desc.toUpperCase().indexOf(search) === -1) {
                    matches = false;
                }

                return matches;
            });
        },
        setTagsWidth: function() {

            var that = this;

            setTimeout(function() {
                var width = 0;
                var tagsCollection = document.querySelectorAll('p.tag');

                if (null === tagsCollection) {
                    return 0;
                }

                var tagElements = [].slice.call(tagsCollection);

                for (element in tagElements) {
                    width += tagElements[element].offsetWidth;
                }

                width += 25;

                that.tagsWidth = width > 370 ? 370 : width;
            }, 50);
            
        },
    },
    watch: {
        tags: function() {
            this.setTagsWidth();
        },
    },
});

var mapStylesConfig = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
];
