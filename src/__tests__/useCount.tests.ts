import { act, renderHook } from "@testing-library/react"
import { useCount } from "../App"

test('should have default value of 0', () => {
    const { result } = renderHook(() => useCount());

    expect(result.current[0]).toBe(0)
});

test('should use the default value if one is provided', () => {
    const { result } = renderHook(() => useCount(10));

    expect(result.current[0]).toBe(10)
});

test('should increment the count', () => {
    const { result } = renderHook(() => useCount());

    act(() => {
        result.current[1]();
    });

    expect(result.current[0]).toBe(1);
})