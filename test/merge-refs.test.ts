import { describe, expect, it, vi } from "vitest";
import { mergeRefs } from "@/lib/merge-refs";

describe("mergeRefs", () => {
  it("calls each function ref with the same value", () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const fn3 = vi.fn();

    const callback = mergeRefs(fn1, fn2, fn3);
    callback("my-element" as unknown as Element);

    expect(fn1).toHaveBeenCalledWith("my-element");
    expect(fn2).toHaveBeenCalledWith("my-element");
    expect(fn3).toHaveBeenCalledWith("my-element");
  });

  it("sets current on object refs", () => {
    const obj1 = { current: null };
    const obj2 = { current: null };

    const callback = mergeRefs<Element>(obj1, obj2);
    const el = { tagName: "DIV" } as unknown as Element;
    callback(el);

    expect(obj1.current).toBe(el);
    expect(obj2.current).toBe(el);
  });

  it("handles mixed function and object refs", () => {
    const fn = vi.fn();
    const obj = { current: null };

    const callback = mergeRefs(fn, obj);
    const el = { tagName: "SPAN" } as unknown as Element;
    callback(el);

    expect(fn).toHaveBeenCalledWith(el);
    expect(obj.current).toBe(el);
  });

  it("ignores undefined refs", () => {
    const fn = vi.fn();
    const callback = mergeRefs(
      fn,
      undefined,
      null as unknown as React.Ref<unknown>,
    );
    callback("val" as unknown as Element);
    expect(fn).toHaveBeenCalledWith("val");
  });

  it("returns a callable ref callback", () => {
    const fn = vi.fn();
    const callback = mergeRefs(fn);
    expect(typeof callback).toBe("function");
    callback("x" as unknown as Element);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
