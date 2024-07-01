import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

// Test cases for normalizeURL
test("HTTPS and trailing slash", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path"
  );
});

test("HTTPS and no trailing slash", () => {
  expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("HTTP and trailing slash", () => {
  expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
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

// Test cases for getURLsFromHTML
test("Single link", () => {
  const htmlBody = `<a href="/path">Link</a>`;
  const baseURL = "https://blog.boot.dev";
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([
    "https://blog.boot.dev/path",
  ]);
});

test("Multiple links", () => {
  const htmlBody = `<a href="/path1">Link 1</a><a href="/path2">Link 2</a>`;
  const baseURL = "https://blog.boot.dev";
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([
    "https://blog.boot.dev/path1",
    "https://blog.boot.dev/path2",
  ]);
});

test("No links", () => {
  const htmlBody = `<div>No links</div>`;
  const baseURL = "https://blog.boot.dev";
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([]);
});

test("Absolute links", () => {
  const htmlBody = `<a href="https://blog.boot.dev/path">Link</a>`;
  const baseURL = "https://blog.boot.dev";
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([
    "https://blog.boot.dev/path",
  ]);
});

test("Relative links", () => {
  const htmlBody = `<a href="path">Link</a>`;
  const baseURL = "https://blog.boot.dev";
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([
    "https://blog.boot.dev/path",
  ]);
});

test("Mixed links", () => {
  const htmlBody = `<a href="https://blog.boot.dev/path1">Link 1</a><a href="/path2">Link 2</a>`;
  const baseURL = "https://blog.boot.dev";
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([
    "https://blog.boot.dev/path1",
    "https://blog.boot.dev/path2",
  ]);
});

test("Links with query", () => {
  const htmlBody = `<a href="/path?id=123">Link</a>`;
  const baseURL = "https://blog.boot.dev";
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([
    "https://blog.boot.dev/path?id=123",
  ]);
});

test("Links with fragment", () => {
  const htmlBody = `<a href="/path#123">Link</a>`;
  const baseURL = "https://blog.boot.dev";
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([
    "https://blog.boot.dev/path#123",
  ]);
});
