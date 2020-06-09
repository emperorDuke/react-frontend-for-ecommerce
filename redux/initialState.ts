import {products, stores, carousels, categories, dummyFilters as filters} from '../global-data';


export function Preloadedstate() {

    const purchaseDetails = {
        purchaseDetails: [
            {
                productId: products[0].id,
                index: 1,
                name: products[0].name,
                image: products[0].image_1,
                variants: {
                    colors: products[0].xtics.colors[1],
                    sizes: products[0].xtics.sizes[2]
                },
                qty: 2,
                subtotalPrice: 2 * Number(products[0].price),
                unitPrice: Number(products[0].price),
                seller: 'duktex'
            },
            {
                productId: products[0].id,
                index: 2,
                name: products[0].name,
                image: products[0].image_1,
                variants: {
                    colors:products[0].xtics.colors[2],
                    sizes:products[0].xtics.sizes[4]
                },
                qty: 2,
                subtotalPrice: 2 * Number(products[0].price),
                unitPrice: Number(products[0].price),
                seller: 'duktex'
            }
        ]
    }

    const locations = {
        locations: [
            {
                name: "Nigeria",
                track_id: 'd4f5yg6',
                children: [
                    {
                        name: 'lagos',
                        track_id: 'f4g66h',
                        children: null
                    },
                    {
                        name: 'kano',
                        track_id: 'f4g66h',
                        children: null
                    },
                    {
                        name: 'calabar',
                        track_id: 'f4g66h',
                        children: null
                    },
                ]
            }
        ]
    }

    return  ({
        stores: {
            stores
        },
        carousels: {
            carousels
        },
        products: {
            products
        },
        categories: {
            categories
        },
        filters:{
            filters
        },
        locations,
        purchaseDetails
    });
}
