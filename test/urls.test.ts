import { describe, expect, it } from "vitest";
import { normalize, isActive } from "@/lib/urls";

describe("urls", () => {
  describe("normalize", () => {
    it("strips trailing slash when length > 1", () => {
      expect(normalize("/foo/")).toBe("/foo");
      expect(normalize("/foo/bar/")).toBe("/foo/bar");
    });

    it("leaves single-character strings unchanged", () => {
      expect(normalize("/")).toBe("/");
      expect(normalize("a")).toBe("a");
    });

    it("leaves paths without trailing slash unchanged", () => {
      expect(normalize("/foo")).toBe("/foo");
      expect(normalize("")).toBe("");
      expect(normalize("api")).toBe("api");
    });
  });

  describe("isActive", () => {
    it("returns true when href equals pathname", () => {
      expect(isActive("/crm", "/crm")).toBe(true);
      expect(isActive("/portal", "/portal")).toBe(true);
    });

    it("returns false when href differs from pathname", () => {
      expect(isActive("/crm", "/portal")).toBe(false);
      expect(isActive("/a", "/b")).toBe(false);
    });

    it("respects nested mode when enabled", () => {
      expect(isActive("/crm", "/crm", true)).toBe(true);
      expect(isActive("/crm", "/crm/getting-started", true)).toBe(true);
      expect(isActive("/crm", "/crm/leads", true)).toBe(true);
    });

    it("ignores nested mode when disabled (default)", () => {
      expect(isActive("/crm", "/crm/getting-started")).toBe(false);
      expect(isActive("/crm", "/crm/leads")).toBe(false);
    });

    it("normalizes both arguments before comparing", () => {
      expect(isActive("/crm/", "/crm")).toBe(true);
      expect(isActive("/crm", "/crm/")).toBe(true);
      expect(isActive("/crm/", "/crm/")).toBe(true);
    });
  });
});
