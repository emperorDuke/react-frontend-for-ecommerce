import React from "react";
import Sorter from "..";
import renderWithRedux from "../../../test-utils/renderWithRedux";
import { globalFilters } from "../utils";
import { render, fireEvent, cleanup } from "@testing-library/react";


describe("sorter component works",  () => {
    
    const ReduxProvider = renderWithRedux();


    let { getAllByTestId, getByDisplayValue, container, queryByTestId } = render(
        <ReduxProvider>
            <Sorter/>
        </ReduxProvider>
    );

    afterAll(() => {
        cleanup()
    })


    it("renders all the filter options", () => {
        const options = getAllByTestId('select-option');
        expect(options.length).toEqual(4);
    });

    it("checks if the select component changes the filter", () => {
        const select = queryByTestId('filter-select');
        expect(select).toBeTruthy()
        if (select) fireEvent.change(select, { target: {value: globalFilters[1].text} });
        const option = getByDisplayValue(globalFilters[1].text);
        expect(option.textContent).toEqual(globalFilters[1].text);
    });

    it("checks if the view button will change the product card type", () => {
        const listIconBtn = container.querySelector('#list-icon-btn')
        expect(listIconBtn).toBeTruthy()
        if (listIconBtn) fireEvent.click(listIconBtn);
        const listCard = container.querySelector('#list-card')
        expect(listCard).toBeTruthy()
    });
});
 