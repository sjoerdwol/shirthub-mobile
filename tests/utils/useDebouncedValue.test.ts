import useDebouncedValue from "@/utils/useDebouncedValue";
import { act, renderHook } from "@testing-library/react-native";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('returns the initial value immediately', () => {
  const { result } = renderHook(() => useDebouncedValue('start', 300));

  expect(result.current).toBe('start');
});

it('updates the value only after the delay has passed', () => {
  const { result, rerender } = renderHook(({ value }: { value: string }) => useDebouncedValue(value, 300), {
    initialProps: { value: 'a' },
  });

  rerender({ value: 'b' });
  expect(result.current).toBe('a');

  act(() => {
    jest.advanceTimersByTime(299);
  });
  expect(result.current).toBe('a');

  act(() => {
    jest.advanceTimersByTime(1);
  });
  expect(result.current).toBe('b');
});

it('resets the timer when the value changes again before the delay', () => {
  const { result, rerender } = renderHook(({ value }: { value: string }) => useDebouncedValue(value, 300), {
    initialProps: { value: 'a' },
  });

  rerender({ value: 'b' });
  act(() => {
    jest.advanceTimersByTime(200);
  });
  rerender({ value: 'c' });
  act(() => {
    jest.advanceTimersByTime(200);
  });
  expect(result.current).toBe('a');

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(result.current).toBe('c');
});
