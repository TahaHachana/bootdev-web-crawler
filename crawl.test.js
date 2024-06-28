import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test("HTTPS and trailing slash", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path"
  );
});

test("HTTPS and no trailing slash", () => {
  expect(normalizeURL("https://blog.boot.dev/path")).toBe(
    "blog.boot.dev/path"
  );
});

test("HTTP and trailing slash", () => {
  expect(normalizeURL("http://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path"
  );
});

test("HTTP and no trailing slash", () => {
  expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("Contains query", () => {
  expect(normalizeURL("https://blog.boot.dev/path?id=123")).toBe(
    "blog.boot.dev/path"
  );
});

test("Contains fragment", () => {
  expect(normalizeURL("https://blog.boot.dev/path#123")).toBe(
    "blog.boot.dev/path"
  );
});
