

export const dummyFilters = {
    brand: [
        {
            key: "Nike",
            value: "brand=Nike"
        },
        {
            key: "Addidas",
            value: "brand=Addidas"
        },
        {
            key: "Puma",
            value: "brand=Puma"
        }
    ],
    price: [
        {
            key: '10000 - 30000',
            value: 'price__gte=10000&price__lte=30000'
        },
        {
            key: '40000 - 70000',
            value: 'price__gte=40000&price__lte=70000'
        },
        {
            key: '80000 - 120000',
            value: 'price__gte=80000&price__lte=130000'
        }
    ],
    rating: [
        {
            key: '3.0',
            value: 'rating__gte=3.5'
        },
        {
            key: '4.0',
            value: 'rating__gte=3.5'
        }
    ],
    size: [
        {
            key: 'XS',
            value: 'size=XS'
        },
        {
            key: 'SM',
            value: 'size=SM'
        },
        {
            key: 'L',
            value: 'size=L'
        },
    ],
    color: [
        {
            key: 'Blue',
            value: 'color=Blue'
        },
        {
            key: 'Red',
            value: 'color=Red'
        },
        {
            key: 'Orange',
            value: 'color=Orange'
        },
        {
            key: 'Yellow',
            value: 'color=Yellow'
        }
    ]
}


export const categories = [
    {
        name: "fashion",
        track_id: '34gh6',
        children: [
            {
                name: "men clothings",
                track_id: "46g5y55g",
                children: [
                    {
                        name: "shirts",
                        track_id: "4f44gg4",
                        children: null
                    },
                    {
                        name: "polos",
                        track_id: "4f44gg4",
                        children: null 
                    }
                ]
            },
            {
                name: "female clothings",
                track_id: "46g5y55g",
                children: [
                    {
                        name: "skirts",
                        track_id: "4f44gg4",
                        children: null
                    },
                    {
                        name: "blouse",
                        track_id: "4f44gg4",
                        children: null 
                    }
                ]
            },
            {
                name: "beauty",
                track_id: "46g5y55g",
                children: [
                    {
                        name: "perfumes",
                        track_id: "4f44gg4",
                        children: null
                    },
                    {
                        name: "hair care and styling",
                        track_id: "4f44gg4",
                        children: null 
                    }
                ]
            }
        ]
    },
    {
        name: "computer and accessories",
        track_id: '34gh6',
        children: [
            {
                name: "laptops",
                track_id: "46g5y55g",
                children: [
                    {
                        name: "notebook",
                        track_id: "4f44gg4",
                        children: null
                    },
                    {
                        name: "mini laptops",
                        track_id: "4f44gg4",
                        children: null 
                    }
                ]
            },
            {
                name: "desktops and monitors",
                track_id: "46g5y55g",
                children: [
                    {
                        name: "CPUs",
                        track_id: "4f44gg4",
                        children: null
                    },
                    {
                        name: "monitors",
                        track_id: "4f44gg4",
                        children: null 
                    }
                ]
            },
            {
                name: "computer and accessories",
                track_id: "46g5y55g",
                children: [
                    {
                        name: "cables",
                        track_id: "4f44gg4",
                        children: null
                    },
                    {
                        name: "ups",
                        track_id: "4f44gg4",
                        children: null 
                    }
                ]
            }
        ]
    },
]

export const newCategories = {
    'fashion': {
        'men_clothings': [
            'shirts',
            'polos',
            't-shirts',
            'jerseys',
            'underwears_&_sleepwears',
            'jeans',
            'trouser_&_shorts',
            'traditional_wears',
            'suits_blazers_jacket',
            'accessories'
        ],
        'women_clothings' :[
            'skirts',
            'blouse',
            'jeans',
            'underwear_&_sleepwear',
            'accessories'
        ],  
        'beauty':[
            'perfumes',
            'bath_&_body',
            'hair_care_&_styling',
            'makeup',
            'nail_care',
            'shaving_&_hair_removal',
            'skin_care'
        ],
        'handbags': [
            "luxury_handbags",
            'handbags',
        ],
        'jewelrly': [
            'diamond_jewelry',
            'men_jewelry',
            'vintage_&_antique',
            'engagement_&_wedding',
            'fashion_jewlry'
        ],
        "kids_and_baby_clothing_shoes_and_accessories": [
            "bottoms",
            "coats_&_jackets",
            "dresses",
            "outfits_&_sets",
            "shoes",
            "sleepwear",
            "sweaters",
            "tops_&_t-shirts",
        ],
        "shoes": [
            "baby_&_toodler_boys",
            "baby_&_tooller_girls",
            "boys",
            "girls",
            "men_shoes",
            "women_shoes",
        ],
        "watches": [
            "men_wristwatches",
            "female_wristwatches",
            "pocket_watches",
            "wristwatch_bands",
            "boxes, cases_&_watch winders"
        ],
        "health": [
            "oral_care",
            "sexual_wellness",
            "vision_care",
            "vitamins_&_supplements",
            "weight_management",
            "health care"
        ]
    },
    "computer_&_acessories":{
        "laptops": [
            "mini_laptops_&_Netbooks",
            "notebooks",
            "ultabooks",
            "hybrid_PCs",
            "macbooks"
        ],
        "desktops_&_monitors": [
            "CPUs",
            "Monitors",
            "UPS",
            "servers",
            "desktop_bundles"
        ],
        "computer_accessories": [
            "computer_peripherals",
            "Bags, Cases, Covers_&_Sleeves",
            "laptop_&_desktop_accessories",
            "storage_devices"
        ],
        "printers, Scanners_&_other_accessories": [
            "Printers",
            "scanner",
            "inks, Toner_&_Cartridges"
        ],
        "wifi_&_networking": [
            "switches",
            "routers",
            "moderms",
            "networking_peripherals"
        ],
        "pc_games": [
            "pc_games",
            "pc_gaming_accessories"
        ]
    },
    "phones_&_tablets": {
        "mobile_phones_&_accessories":[
            "batteries",
            "cable_&_adapters",
            "cases, covers_&_ skins",
            "cell_phone_parts",
            "cell_phones_&_smartphones",
            "charger_&_cradles",
            "headsets_&_earphones",
            "smartwatches_&_brands",
            "power_banks",
        ],
        "tablets": [
            "android",
            "IOS",
            "windows",
            "other_OS's",
            "tablet_accesssories"
        ]
    },
    "electronics":{
        "Televisions": [
            "smart_TV's",
            "led_TV's",
            "curved_TV's",
            "Oled_TV's",
            "plasma_TV's"
        ],
        "cameras_&_photo": [
            "binocular_&_telescopes",
            "camcorders",
            "camera_&_photo_accessories",
            "camera_drones",
            "CCTV_cameras",
            "camera_lenses_&_filter",
            "digital_cameras",
            "flashes_&_flash_accessories",
            "photo_lighthing_&_studio_equipments",
        ],
        "audio's":[
            
        ]
    }
}

export const stores = [
    {
        id: 1,
        logo: '/static/hp_42ee85b5f3ac14b5367b2a998a8bcabc.jpg',
        name: 'duketx',
        location: 'lagos',
        rating:{
            average_rating: 4.5,
            n_one_star: 200,
            n_two_stars: 200,
        },
        adverts:{
            id: 1,
            store: 1,
            advert_1 : '/static/cOne.jpg',
            advert_2: '/static/cTwo.jpg'
        }
    },
    {
        id: 2,
        logo: '/static/midea_a95757a4cfec5b22202e7f9304481d50.jpg',
        name: 'duketx',
        location: 'abj',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 3,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 4,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 5,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 6,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 7,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 8,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 9,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 10,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
       rating:{
            average_rating: 0
        }
    },
    {
        id: 11,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 12,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 13,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 14,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 15,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 16,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 17,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 18,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 19,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
    {
        id: 20,
        logo: '/static/syinix_6714a8c5429c296b0a36867a2b202296.jpg',
        name: 'duketx',
        location: 'calabar',
        rating:{
            average_rating: 0
        }
    },
];


export const products = [
    {
        "id": 1,
        "store": 1,
        "name": "Pampers that will make your baby sleep fine",
        "price": "50000.00",
        "discount_price": "4000.00",
        "category": "Electronics",
        "image_1": '/static/pOne.jpg',
        "image_2": '/static/pTwo.jpg',
        "image_3": '/static/hp_42ee85b5f3ac14b5367b2a998a8bcabc.jpg',
        "image_4": '/static/pOne.jpg',
        "image_5": '/static/pTwo.jpg',
        "image_6": '/static/pThree.jpg',
        "brand": "Nike",
        "in_stock": false,
        "xtics": {
            "colors": [
                {
                    "id": 1,
                    "vendor_defined": "green",
                    "thumb": '/static/pOne.jpg',
                },
                {
                    "id": 2,
                    "vendor_defined": "yellow",
                    "thumb": '/static/pTwo.jpg',
                },
                {
                    "id": 3,
                    "vendor_defined": "blue",
                    "thumb":  '/static/hp_42ee85b5f3ac14b5367b2a998a8bcabc.jpg',
                },
                {
                    "id": 4,
                    "vendor_defined": "blue",
                    "thumb":  '/static/hp_42ee85b5f3ac14b5367b2a998a8bcabc.jpg',
                },
                {
                    "id": 5,
                    "vendor_defined": "blue",
                    "thumb":  '/static/hp_42ee85b5f3ac14b5367b2a998a8bcabc.jpg',
                },
                {
                    "id": 6,
                    "vendor_defined": "blue",
                    "thumb":  '/static/hp_42ee85b5f3ac14b5367b2a998a8bcabc.jpg',
                },
                {
                    "id": 7,
                    "vendor_defined": "blue",
                    "thumb":  '/static/hp_42ee85b5f3ac14b5367b2a998a8bcabc.jpg',
                },
                {
                    "id": 8,
                    "vendor_defined": "blue",
                    "thumb":  '/static/hp_42ee85b5f3ac14b5367b2a998a8bcabc.jpg',
                }
            ],
            "sizes": [
                {
                    "id": 1,
                    "uk": "34.6",
                    "usa": "12.7",
                    "italy": "23.7",
                    "europe": "90.6",
                    "vendor_defined": "m",
                },
                {
                    "id": 2,
                    "uk": "45.7",
                    "usa": "12.9",
                    "italy": "67.3",
                    "europe": "45.9",
                    "vendor_defined": "sm",
                },
                {
                    "id": 3,
                    "uk": "34.6",
                    "usa": "78.5",
                    "italy": "56.2",
                    "europe": "11.8",
                    "vendor_defined": "L",
                },
                {
                    "id": 4,
                    "uk": "34.6",
                    "usa": "78.5",
                    "italy": "56.2",
                    "europe": "11.8",
                    "vendor_defined": "XL",
                },
                {
                    "id": 5,
                    "uk": "34.6",
                    "usa": "78.5",
                    "italy": "56.2",
                    "europe": "11.8",
                    "vendor_defined": "XS",
                }
            ],
        },
        "key_features": {
            "key_feature_1": "it flys",
            "key_feature_2": "it jumps",
            "key_feature_3": "it runs",
            "key_feature_4": "i dont know",
            "key_feature_5": "",
            "key_feature_6": "",
            "key_feature_7": "",
            "key_feature_8": "",
            "key_feature_9": "",
            "key_feature_10": "",
        },
        "specifications": {
            "weight": "50kg",
            "color": "as shown above",
            "product_use": "",
            "warranty": "2 years",
            "gender": "unisex",
            "specification_id": "SPEC-l1rpwuf2ma",
        },
        "descriptions": {
            "description": "Enjoy smooth performance aided by the Android Nougat 7.0 which gives you access to some of the latest and best apps on the Google play store. The S10 Lite smartphone embodies a sturdy build with an eye-catching design at par with competing smartphones. A 32GB internal memory that can be expanded provides enough space for music, videos, apps and pictures, while the LTE capability aids real-time communication with your friends and family. Buy the Gionee S10 Lite smartphone online from Jumia at the best price in Nigeria ",
            "image_description_1": '/static/pOne.jpg',
            "image_description_2": '/static/pTwo.jpg',
            "image_description_3": null,
            "image_description_4": null,
            "image_description_5": null,
        },
        "rating": {
            "average_rating": "4",
            "n_one_star": 0,
            "n_two_stars": 0,
            "n_three_stars": 0,
            "n_four_stars": 0,
            "n_five_stars": 0,
            "n_votes": 0,
        },
    },
    {
        "id": 2,
        "store": 1,
        "name": "pampers",
        "price": "10000.00",
        "discount_price": "4000.00",
        "category": "Electronics",
        "image_1": '/static/pTwo.jpg',
        "image_2": null,
        "image_3": null,
        "image_4": null,
        "image_5": null,
        "image_6": null,
        "brand": "Nike",
        "in_stock": true,
        "xtics": {
            "colors": [
                {
                    "id" : 1,
                    "vendor_defined": "green",
                    "thumb": null,
                },
                {
                    "id": 2,
                    "vendor_defined": "yellow",
                    "thumb": null,
                },
                {
                    "id": 3,
                    "vendor_defined": "blue",
                    "thumb": '/static/pThree.jpg',
                }
            ],
            "sizes": [
                {
                    "id": 1,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                },
                {
                    "id": 2,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "l",
                },
                {
                    "id": 3,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "xl",
                }
            ],
        },
        "key_features": {
            "key_feature_1": "it flys",
            "key_feature_2": "it jumps",
            "key_feature_3": "it runs",
            "key_feature_4": "i dont know",
            "key_feature_5": "",
            "key_feature_6": "",
            "key_feature_7": "",
            "key_feature_8": "",
            "key_feature_9": "",
            "key_feature_10": ""
        },
        "specifications": {
            "weight": "50kg",
            "color": "as shown above",
            "product_use": "",
            "warranty": "2 years",
            "gender": "unisex",
            "specification_id": "SPEC l1rpwuf2ma"
        },
        "descriptions": {
            "description": "it is  the best product there is, it cam fly and it can jump and it can even go to space",
            "image_description_1": '/static/pThree.jpg',
            "image_description_2": null,
            "image_description_3": null,
            "image_description_4": null,
            "image_description_5": null,
        },
        "rating": {
            "average_rating": "2.5",
            "n_one_star": 0,
            "n_two_stars": 0,
            "n_three_stars": 0,
            "n_four_stars": 0,
            "n_five_stars": 0,
            "n_votes": 0
        }
    },
    {
        "id": 3,
        "store": 1,
        "name": "pampers",
        "price": "9000.00",
        "discount_price": "4000.00",
        "category": "Electronics",
        "image_1": '/static/pOne.jpg',
        "image_2": null,
        "image_3": null,
        "image_4": null,
        "image_5": null,
        "image_6": null,
        "brand": "Nike",
        "in_stock": true,
        "xtics":{
            "colors": [
                {
                    "id" : 1,
                    "vendor_defined": "green",
                    "thumb": null,
                },
                {
                    "id": 2,
                    "vendor_defined": "yellow",
                    "thumb": null,
                },
                {
                    "id": 3,
                    "vendor_defined": "blue",
                    "thumb": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/color_thumbs/889e7d49-d63.jpg",
                }
            ],
            "sizes": [
                {
                    "id": 1,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                },
                {
                    "id": 2,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                },
                {
                    "id": 3,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                }
            ],
        },
        "key_features": {
            "key_feature_1": "it flys",
            "key_feature_2": "it jumps",
            "key_feature_3": "it runs",
            "key_feature_4": "i dont know",
            "key_feature_5": "",
            "key_feature_6": "",
            "key_feature_7": "",
            "key_feature_8": "",
            "key_feature_9": "",
            "key_feature_10": "",
        },
        "specifications": {
            "weight": "50kg",
            "color": "as shown above",
            "product_use": "",
            "warranty": "2 years",
            "gender": "unisex",
            "specification_id": "SPEC l1rpwuf2ma",
        },
        "descriptions": {
            "description": "the package is very good it will make your head swell",
            "image_description_1": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/img_description/gaggdugudgw_u8mpq89.jpg",
            "image_description_2": null,
            "image_description_3": null,
            "image_description_4": null,
            "image_description_5": null,
        },  
        "rating": 
            {
                "average_rating": "0.0",
                "n_one_star": 0,
                "n_two_stars": 0,
                "n_three_stars": 0,
                "n_four_stars": 0,
                "n_five_stars": 0,
                "n_votes": 0,
            }
        },
        {
            "id": 4,
            "store": 1,
            "name": "pampers",
            "price": "5000.00",
            "discount_price": "4000.00",
            "category": "Electronics",
            "image_1": '/static/pOne.jpg',
            "image_2": null,
            "image_3": null,
            "image_4": null,
            "image_5": null,
            "image_6": null,
            "brand": "Nike",
            "in_stock": true,
            "xtics": {
                "colors": [
                    {
                        "id": 3,
                        "vendor_defined": "green",
                        "thumb": null,
                        "added_at": "2019-04-12T17:04:30.157324Z",
                        "updated_at": "2019-04-12T17:04:30.157324Z",
                        "product": 1
                    },
                    {
                        "id": 2,
                        "vendor_defined": "yellow",
                        "thumb": null,
                        "added_at": "2019-04-12T17:04:30.157324Z",
                        "updated_at": "2019-04-12T17:04:30.157324Z",
                        "product": 1
                    },
                    {
                        "id": 1,
                        "vemdor_defined": "blue",
                        "thumb": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/color_thumbs/889e7d49-d63.jpg",
                        "added_at": "2019-04-12T17:04:30.157324Z",
                        "updated_at": "2019-04-12T17:04:30.157324Z",
                        "product": 1
                    }
                ],
                "sizes": [
                    {
                        "id": 3,
                        "uk": "",
                        "usa": "",
                        "italy": "",
                        "europe": "",
                        "vendor_defined": "m",
                        "added_at": "2019-04-12T17:04:30.105322Z",
                        "updated_at": "2019-04-12T17:04:30.105322Z",
                        "product": 1
                    },
                    {
                        "id": 2,
                        "uk": "",
                        "usa": "",
                        "italy": "",
                        "europe": "",
                        "vendor_defined": "m",
                        "added_at": "2019-04-12T17:04:30.105322Z",
                        "updated_at": "2019-04-12T17:04:30.105322Z",
                        "product": 1
                    },
                    {
                        "id": 1,
                        "uk": "",
                        "usa": "",
                        "italy": "",
                        "europe": "",
                        "vendor_defined": "m",
                        "added_at": "2019-04-12T17:04:30.105322Z",
                        "updated_at": "2019-04-12T17:04:30.105322Z",
                        "product": 1
                    }
                ],
        },
    
        "key_features": {
            "details": 1,
            "key_feature_1": "it flys",
            "key_feature_2": "it jumps",
            "key_feature_3": "it runs",
            "key_feature_4": "i dont know",
            "key_feature_5": "",
            "key_feature_6": "",
            "key_feature_7": "",
            "key_feature_8": "",
            "key_feature_9": "",
            "key_feature_10": "",
            "added_at": "2019-04-12T17:04:30.083313Z",
            "updated_at": "2019-04-12T17:04:30.083313Z"
        },
        "description": "the package is very good it will make your head swell",
        "specifications": {
            "details": 1,
            "weight": "50kg",
            "color": "as shown above",
            "product_use": "",
            "warranty": "2 years",
            "gender": "unisex",
            "specification_id": "SPEC l1rpwuf2ma",
            "added_at": "2019-04-12T17:04:30.020397Z",
            "updated_at": "2019-04-12T17:04:30.020397Z"
        },
        "image_descriptions": {
            "details": 1,
            "image_description_1": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/img_description/gaggdugudgw_u8mpq89.jpg",
            "image_description_2": null,
            "image_description_3": null,
            "image_description_4": null,
            "image_description_5": null,
            "added_at": "2019-04-12T17:04:30.075316Z",
            "updated_at": "2019-04-12T17:04:30.075316Z"
        },
        "added_at": "2019-04-12T17:04:30.008202Z",
        "updated_at": "2019-04-12T17:04:30.008202Z",
        "rating": {
            "product": 1,
            "average_rating": "0.0",
            "n_one_star": 0,
            "n_two_stars": 0,
            "n_three_stars": 0,
            "n_four_stars": 0,
            "n_five_stars": 0,
            "n_votes": 0,
            "added_at": "2019-04-12T17:04:30.000401Z",
            "updated_at": "2019-04-12T17:04:30.000401Z"
        }
    },
    {
        "id": 5,
        "store": 5,
        "name": "pampers",
        "price": "8000.00",
        "discount_price": "4000.00",
        "category": "Electronics",
        "image_1": '/static/pOne.jpg',
        "image_2": null,
        "image_3": null,
        "image_4": null,
        "image_5": null,
        "image_6": null,
        "brand": "Nike",
        "in_stock": true,
        "xtics": {
            "colors": [
                {
                    "id": 3,
                    "vendor_defined": "green",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "vendor_defined": "yellow",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "vemdor_defined": "blue",
                    "thumb": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/color_thumbs/889e7d49-d63.jpg",
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                }
            ],
            "sizes": [
                {
                    "id": 3,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                }
            ],
    },

    "key_features": {
        "details": 1,
        "key_feature_1": "it flys",
        "key_feature_2": "it jumps",
        "key_feature_3": "it runs",
        "key_feature_4": "i dont know",
        "key_feature_5": "",
        "key_feature_6": "",
        "key_feature_7": "",
        "key_feature_8": "",
        "key_feature_9": "",
        "key_feature_10": "",
        "added_at": "2019-04-12T17:04:30.083313Z",
        "updated_at": "2019-04-12T17:04:30.083313Z"
    },
    "description": "the package is very good it will make your head swell",
    "specifications": {
        "details": 1,
        "weight": "50kg",
        "color": "as shown above",
        "product_use": "",
        "warranty": "2 years",
        "gender": "unisex",
        "specification_id": "SPEC l1rpwuf2ma",
        "added_at": "2019-04-12T17:04:30.020397Z",
        "updated_at": "2019-04-12T17:04:30.020397Z"
    },
    "image_descriptions": {
        "details": 1,
        "image_description_1": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/img_description/gaggdugudgw_u8mpq89.jpg",
        "image_description_2": null,
        "image_description_3": null,
        "image_description_4": null,
        "image_description_5": null,
        "added_at": "2019-04-12T17:04:30.075316Z",
        "updated_at": "2019-04-12T17:04:30.075316Z"
    },
    "added_at": "2019-04-12T17:04:30.008202Z",
    "updated_at": "2019-04-12T17:04:30.008202Z",
    "rating": {
        "product": 1,
        "average_rating": "0.0",
        "n_one_star": 0,
        "n_two_stars": 0,
        "n_three_stars": 0,
        "n_four_stars": 0,
        "n_five_stars": 0,
        "n_votes": 0,
        "added_at": "2019-04-12T17:04:30.000401Z",
        "updated_at": "2019-04-12T17:04:30.000401Z"
    }
    },
    {
        "id": 6,
        "store": 6,
        "name": "pampers",
        "price": "5600.00",
        "discount_price": "4000.00",
        "category": "Electronics",
        "image_1":'/static/pOne.jpg',
        "image_2": null,
        "image_3": null,
        "image_4": null,
        "image_5": null,
        "image_6": null,
        "brand": "Nike",
        "in_stock": true,
        "xtics": {
            "colors": [
                {
                    "id": 3,
                    "vendor_defined": "green",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "vendor_defined": "yellow",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "vemdor_defined": "blue",
                    "thumb": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/color_thumbs/889e7d49-d63.jpg",
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                }
            ],
            "sizes": [
                {
                    "id": 3,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                }
            ],
        },
    
        "key_features": {
            "details": 1,
            "key_feature_1": "it flys",
            "key_feature_2": "it jumps",
            "key_feature_3": "it runs",
            "key_feature_4": "i dont know",
            "key_feature_5": "",
            "key_feature_6": "",
            "key_feature_7": "",
            "key_feature_8": "",
            "key_feature_9": "",
            "key_feature_10": "",
            "added_at": "2019-04-12T17:04:30.083313Z",
            "updated_at": "2019-04-12T17:04:30.083313Z"
        },
        "description": "the package is very good it will make your head swell",
        "specifications": {
            "details": 1,
            "weight": "50kg",
            "color": "as shown above",
            "product_use": "",
            "warranty": "2 years",
            "gender": "unisex",
            "specification_id": "SPEC l1rpwuf2ma",
            "added_at": "2019-04-12T17:04:30.020397Z",
            "updated_at": "2019-04-12T17:04:30.020397Z"
        },
        "image_descriptions": {
            "details": 1,
            "image_description_1": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/img_description/gaggdugudgw_u8mpq89.jpg",
            "image_description_2": null,
            "image_description_3": null,
            "image_description_4": null,
            "image_description_5": null,
            "added_at": "2019-04-12T17:04:30.075316Z",
            "updated_at": "2019-04-12T17:04:30.075316Z"
        },
        "added_at": "2019-04-12T17:04:30.008202Z",
        "updated_at": "2019-04-12T17:04:30.008202Z",
        "rating": {
            "product": 1,
            "average_rating": "0.0",
            "n_one_star": 0,
            "n_two_stars": 0,
            "n_three_stars": 0,
            "n_four_stars": 0,
            "n_five_stars": 0,
            "n_votes": 0,
            "added_at": "2019-04-12T17:04:30.000401Z",
            "updated_at": "2019-04-12T17:04:30.000401Z"
        }
    },
    {
        "id": 7,
        "store": 7,
        "name": "pampers",
        "price": "5500.00",
        "discount_price": "4000.00",
        "category": "Electronics",
        "image_1": '/static/pOne.jpg',
        "image_2": null,
        "image_3": null,
        "image_4": null,
        "image_5": null,
        "image_6": null,
        "brand": "Nike",
        "in_stock": true,
        "xtics": {
            "colors": [
                {
                    "id": 3,
                    "vendor_defined": "green",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "vendor_defined": "yellow",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "vemdor_defined": "blue",
                    "thumb": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/color_thumbs/889e7d49-d63.jpg",
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                }
            ],
            "sizes": [
                {
                    "id": 3,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                }
            ],
        },
    
        "key_features": {
            "details": 1,
            "key_feature_1": "it flys",
            "key_feature_2": "it jumps",
            "key_feature_3": "it runs",
            "key_feature_4": "i dont know",
            "key_feature_5": "",
            "key_feature_6": "",
            "key_feature_7": "",
            "key_feature_8": "",
            "key_feature_9": "",
            "key_feature_10": "",
            "added_at": "2019-04-12T17:04:30.083313Z",
            "updated_at": "2019-04-12T17:04:30.083313Z"
        },
        "description": "the package is very good it will make your head swell",
        "specifications": {
            "details": 1,
            "weight": "50kg",
            "color": "as shown above",
            "product_use": "",
            "warranty": "2 years",
            "gender": "unisex",
            "specification_id": "SPEC l1rpwuf2ma",
            "added_at": "2019-04-12T17:04:30.020397Z",
            "updated_at": "2019-04-12T17:04:30.020397Z"
        },
        "image_descriptions": {
            "details": 1,
            "image_description_1": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/img_description/gaggdugudgw_u8mpq89.jpg",
            "image_description_2": null,
            "image_description_3": null,
            "image_description_4": null,
            "image_description_5": null,
            "added_at": "2019-04-12T17:04:30.075316Z",
            "updated_at": "2019-04-12T17:04:30.075316Z"
        },
        "added_at": "2019-04-12T17:04:30.008202Z",
        "updated_at": "2019-04-12T17:04:30.008202Z",
        "rating": {
            "product": 1,
            "average_rating": "0.0",
            "n_one_star": 0,
            "n_two_stars": 0,
            "n_three_stars": 0,
            "n_four_stars": 0,
            "n_five_stars": 0,
            "n_votes": 0,
            "added_at": "2019-04-12T17:04:30.000401Z",
            "updated_at": "2019-04-12T17:04:30.000401Z"
        }
    },
    {
        "id": 8,
        "store": 8,
        "name": "pampers",
        "price": "5000.00",
        "discount_price": "4000.00",
        "category": "Electronics",
        "image_1": '/static/pOne.jpg',
        "image_2": null,
        "image_3": null,
        "image_4": null,
        "image_5": null,
        "image_6": null,
        "brand": "Nike",
        "in_stock": true,
        "xtics": {
            "colors": [
                {
                    "id": 3,
                    "vendor_defined": "green",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "vendor_defined": "yellow",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "vemdor_defined": "blue",
                    "thumb": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/color_thumbs/889e7d49-d63.jpg",
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                }
            ],
            "sizes": [
                {
                    "id": 3,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                }
            ],
        },
    
        "key_features": {
            "details": 1,
            "key_feature_1": "it flys",
            "key_feature_2": "it jumps",
            "key_feature_3": "it runs",
            "key_feature_4": "i dont know",
            "key_feature_5": "",
            "key_feature_6": "",
            "key_feature_7": "",
            "key_feature_8": "",
            "key_feature_9": "",
            "key_feature_10": "",
            "added_at": "2019-04-12T17:04:30.083313Z",
            "updated_at": "2019-04-12T17:04:30.083313Z"
        },
        "description": "the package is very good it will make your head swell",
        "specifications": {
            "details": 1,
            "weight": "50kg",
            "color": "as shown above",
            "product_use": "",
            "warranty": "2 years",
            "gender": "unisex",
            "specification_id": "SPEC l1rpwuf2ma",
            "added_at": "2019-04-12T17:04:30.020397Z",
            "updated_at": "2019-04-12T17:04:30.020397Z"
        },
        "image_descriptions": {
            "details": 1,
            "image_description_1": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/img_description/gaggdugudgw_u8mpq89.jpg",
            "image_description_2": null,
            "image_description_3": null,
            "image_description_4": null,
            "image_description_5": null,
            "added_at": "2019-04-12T17:04:30.075316Z",
            "updated_at": "2019-04-12T17:04:30.075316Z"
        },
        "added_at": "2019-04-12T17:04:30.008202Z",
        "updated_at": "2019-04-12T17:04:30.008202Z",
        "rating": {
            "product": 1,
            "average_rating": "0.0",
            "n_one_star": 0,
            "n_two_stars": 0,
            "n_three_stars": 0,
            "n_four_stars": 0,
            "n_five_stars": 0,
            "n_votes": 0,
            "added_at": "2019-04-12T17:04:30.000401Z",
            "updated_at": "2019-04-12T17:04:30.000401Z"
        }
    },
    {
        "id": 9,
        "store": 9,
        "name": "pampers",
        "price": "2000.00",
        "discount_price": "4000.00",
        "category": "Electronics",
        "image_1": '/static/pOne.jpg',
        "image_2": null,
        "image_3": null,
        "image_4": null,
        "image_5": null,
        "image_6": null,
        "brand": "Nike",
        "in_stock": true,
        "xtics": {
            "colors": [
                {
                    "id": 3,
                    "vendor_defined": "green",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "vendor_defined": "yellow",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "vemdor_defined": "blue",
                    "thumb": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/color_thumbs/889e7d49-d63.jpg",
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                }
            ],
            "sizes": [
                {
                    "id": 3,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                }
            ],
        },
    
        "key_features": {
            "details": 1,
            "key_feature_1": "it flys",
            "key_feature_2": "it jumps",
            "key_feature_3": "it runs",
            "key_feature_4": "i dont know",
            "key_feature_5": "",
            "key_feature_6": "",
            "key_feature_7": "",
            "key_feature_8": "",
            "key_feature_9": "",
            "key_feature_10": "",
            "added_at": "2019-04-12T17:04:30.083313Z",
            "updated_at": "2019-04-12T17:04:30.083313Z"
        },
        "description": "the package is very good it will make your head swell",
        "specifications": {
            "details": 1,
            "weight": "50kg",
            "color": "as shown above",
            "product_use": "",
            "warranty": "2 years",
            "gender": "unisex",
            "specification_id": "SPEC l1rpwuf2ma",
            "added_at": "2019-04-12T17:04:30.020397Z",
            "updated_at": "2019-04-12T17:04:30.020397Z"
        },
        "image_descriptions": {
            "details": 1,
            "image_description_1": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/img_description/gaggdugudgw_u8mpq89.jpg",
            "image_description_2": null,
            "image_description_3": null,
            "image_description_4": null,
            "image_description_5": null,
            "added_at": "2019-04-12T17:04:30.075316Z",
            "updated_at": "2019-04-12T17:04:30.075316Z"
        },
        "added_at": "2019-04-12T17:04:30.008202Z",
        "updated_at": "2019-04-12T17:04:30.008202Z",
        "rating": {
            "product": 1,
            "average_rating": "0.0",
            "n_one_star": 0,
            "n_two_stars": 0,
            "n_three_stars": 0,
            "n_four_stars": 0,
            "n_five_stars": 0,
            "n_votes": 0,
            "added_at": "2019-04-12T17:04:30.000401Z",
            "updated_at": "2019-04-12T17:04:30.000401Z"
        }
    },
    {
        "id": 10,
        "store": 10,
        "name": "pampers",
        "price": "500000.00",
        "discount_price": "4000.00",
        "category": "Electronics",
        "image_1": '/static/pOne.jpg',
        "image_2": null,
        "image_3": null,
        "image_4": null,
        "image_5": null,
        "image_6": null,
        "brand": "Nike",
        "in_stock": true,
        "xtics": {
            "colors": [
                {
                    "id": 3,
                    "vendor_defined": "green",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "vendor_defined": "yellow",
                    "thumb": null,
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "vemdor_defined": "blue",
                    "thumb": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/color_thumbs/889e7d49-d63.jpg",
                    "added_at": "2019-04-12T17:04:30.157324Z",
                    "updated_at": "2019-04-12T17:04:30.157324Z",
                    "product": 1
                }
            ],
            "sizes": [
                {
                    "id": 3,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 2,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                },
                {
                    "id": 1,
                    "uk": "",
                    "usa": "",
                    "italy": "",
                    "europe": "",
                    "vendor_defined": "m",
                    "added_at": "2019-04-12T17:04:30.105322Z",
                    "updated_at": "2019-04-12T17:04:30.105322Z",
                    "product": 1
                }
            ],
        },
    
        "key_features": {
            "details": 1,
            "key_feature_1": "it flys",
            "key_feature_2": "it jumps",
            "key_feature_3": "it runs",
            "key_feature_4": "i dont know",
            "key_feature_5": "",
            "key_feature_6": "",
            "key_feature_7": "",
            "key_feature_8": "",
            "key_feature_9": "",
            "key_feature_10": "",
            "added_at": "2019-04-12T17:04:30.083313Z",
            "updated_at": "2019-04-12T17:04:30.083313Z"
        },
        "description": "the package is very good it will make your head swell",
        "specifications": {
            "details": 1,
            "weight": "50kg",
            "color": "as shown above",
            "product_use": "",
            "warranty": "2 years",
            "gender": "unisex",
            "specification_id": "SPEC l1rpwuf2ma",
            "added_at": "2019-04-12T17:04:30.020397Z",
            "updated_at": "2019-04-12T17:04:30.020397Z"
        },
        "image_descriptions": {
            "details": 1,
            "image_description_1": "http://127.0.0.1:8000/media/uploads/duktex/ELECTRONICS/img_description/gaggdugudgw_u8mpq89.jpg",
            "image_description_2": null,
            "image_description_3": null,
            "image_description_4": null,
            "image_description_5": null,
            "added_at": "2019-04-12T17:04:30.075316Z",
            "updated_at": "2019-04-12T17:04:30.075316Z"
        },
        "added_at": "2019-04-12T17:04:30.008202Z",
        "updated_at": "2019-04-12T17:04:30.008202Z",
        "rating": {
            "product": 1,
            "average_rating": "0.0",
            "n_one_star": 0,
            "n_two_stars": 0,
            "n_three_stars": 0,
            "n_four_stars": 0,
            "n_five_stars": 0,
            "n_votes": 0,
            "added_at": "2019-04-12T17:04:30.000401Z",
            "updated_at": "2019-04-12T17:04:30.000401Z"
        }
    }
]

export const carousels = [
    {
        id: 1,
        src: '/static/cOne.jpg',
        altText: 'carousel-1',
        caption: 'ffffkkkk'
    },
    {
        id: 2,
        src: '/static/cTwo.jpg',
        altText: 'carousel-2',
        caption: 'cscnnccnncn'
    },
    {
        id: 3,
        src: '/static/srp.jpg',
        altText: 'nysc',
        caption: 'dfgrhrhrhhhrr'
    },
    {
        id: 4,
        src: '/static/nike1.jpg',
        altText: 'nike',
        caption: 'feeegggg'
    },
    {
        id: 5,
        src: '/static/jesus.jpg',
        altText: 'jesus',
        caption: 'ffffkkkk'
    },
    {
        id: 6,
        src: '/static/church.jpg',
        altText: 'church',
        caption: 'cscnnccnncn'
    },
    {
        id: 7,
        src: '/static/e.png',
        altText: 'e',
        caption: 'dfgrhrhrhhhrr'
    },
    {
        id: 8,
        src: '/static/isp.jpg',
        altText: 'isp',
        caption: 'feeegggg'
    },
]
