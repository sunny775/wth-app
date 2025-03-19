import { renderHook, act } from "@testing-library/react";
import useIntersection from "../../src/hooks/useIntersection";

describe("useIntersection Hook", () => {
  let ref: { current: HTMLElement | null };
  let observerCallback: IntersectionObserverCallback;
  let observerInstance: IntersectionObserver;

  beforeEach(() => {
    ref = { current: document.createElement("div") };

    observerInstance = {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
      takeRecords: jest.fn(),
    } as unknown as IntersectionObserver;

    global.IntersectionObserver = jest.fn((callback) => {
      observerCallback = callback;
      return observerInstance;
    }) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns false initially", () => {
    const { result } = renderHook(() =>
      useIntersection(ref, { threshold: 0.5 })
    );
    expect(result.current).toBe(false);
  });

  test("detects when element is visible and stops observing", () => {
    const { result } = renderHook(() =>
      useIntersection(ref, { threshold: 0.5 })
    );

    expect(observerInstance.observe).toHaveBeenCalledWith(ref.current);

    act(() => {
      observerCallback(
        [{ isIntersecting: true }] as IntersectionObserverEntry[],
        observerInstance
      );
    });

    expect(result.current).toBe(true);
    expect(observerInstance.disconnect).toHaveBeenCalled();
  });

  test("does not update state when element is not visible", () => {
    const { result } = renderHook(() =>
      useIntersection(ref, { threshold: 0.5 })
    );

    act(() => {
      observerCallback(
        [{ isIntersecting: false }] as IntersectionObserverEntry[],
        observerInstance
      );
    });

    expect(result.current).toBe(false);
    expect(observerInstance.disconnect).not.toHaveBeenCalled();
  });

  test("re-observes when options change", () => {
    const { rerender } = renderHook(
      ({ ref, options }) => useIntersection(ref, options),
      {
        initialProps: { ref, options: { threshold: 0.5 } },
      }
    );

    rerender({ ref, options: { threshold: 0.7 } });

    expect(global.IntersectionObserver).toHaveBeenCalledTimes(2);
  });

  test("disconnects observer when unmounting", () => {
    const { unmount } = renderHook(() =>
      useIntersection(ref, { threshold: 0.5 })
    );

    unmount();

    expect(observerInstance.disconnect).toHaveBeenCalled();
  });
});
