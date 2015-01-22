// test.js
var path = require("path");
var FileUtil = require("./FileUtil");

console.log(
    FileUtil.getDestinationPath(
        "C:\\dev\\introduction-to-asp-dot-net\\docs\\md",
        "C:\\dev\\introduction-to-asp-dot-net\\docs\\md\\step1\\step1.md",
        "C:\\dev\\introduction-to-asp-dot-net\\docs\\html"
      )
  );

console.log(path.dirname("C:\\dev\\introduction-to-asp-dot-net\\docs\\md\\step1\\step1.md"));
