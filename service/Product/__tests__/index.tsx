import React from "react";
import { useProducts } from "..";
import { renderHook, act, RenderHookResult } from "@testing-library/react-hooks";
import renderWithRedux from "../../../test-utils/renderWithRedux";
import { globalFilters } from "../../../components/Sorter";
import { UseProductResult } from "../@types";


describe("product service", () => {
    
    const ReduxProvider = renderWithRedux();

    const wrapper:React.FC<{children: React.ReactNode}> = ({children}) => (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    );

    let result1:RenderHookResult<unknown, UseProductResult>; 

    act(() => {
        result1 = renderHook(
            () => useProducts(), 
            { wrapper: wrapper as React.FC }
        );
    });

    let result2:RenderHookResult<unknown, UseProductResult>; 

        act(() => {
            result2 = renderHook(
                () => useProducts(), 
                { wrapper: wrapper as React.FC }
            );
        });

    
    it("checks if products were return", () => {
        expect(result1.result.current[0].length).toEqual(10);
    });

    it("checks if the sort function works", () => {

        act(() => {
            result1.result.current[1].setInCart(2);
        });

        expect(result1.result.current[0].filter(p => p.id === 2)[0].inCart).toEqual(true);
    });
    
    it("checks if another instance of the hook will update the stream", () => {

        act(() => {
            result1.result.current[1].unsetInCart(2);
        });       

        expect(result2.result.current[0].filter(p => p.id === 2)[0].inCart).toEqual(false);

    });

    it("checks if products will be sorted based on their rating from highest to lowest", () => {

        act(() => {
            result1.result.current[1].sort((a, b) => globalFilters[2].cmpFn(a, b));
        });

        const products = result1.result.current[0];

        expect(Number(products[8].rating.average_rating)).toBeLessThan(Number(products[9].rating.average_rating));

    });

    it("checks if products will be sorted based on their price from lowest to highest", () => {
        act(() => {
            result1.result.current[1].sort((a, b) => globalFilters[0].cmpFn(a, b));
        });

        const products = result1.result.current[0];

        expect(Number(products[0].price)).toBeLessThan(Number(products[1].price));
    })
});