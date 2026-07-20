const yaml = require("js-yaml");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({ html: false, breaks: true, linkify: true });

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addFilter("md", (content) => md.renderInline(content || ""));

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
