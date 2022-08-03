import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import { HeadlessCounter } from "../App";

test('increments count when clicked', () => {
    render(<HeadlessCounter>
        {(count, increment) => (
            <>
                <div data-testid="count">{count}</div>
                <button data-testid="increment" onClick={increment} />
            </>
        )}
    </HeadlessCounter>);

    fireEvent.click(screen.getByTestId('increment'));
    const count = screen.getByTestId('count')

    expect(count).toHaveTextContent('1');
});