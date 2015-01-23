// test.js
var path = require("path");
var fs = require("fs");
var FileUtil = require("./FileUtil");

console.log(
    FileUtil.getDestinationPath(
        "C:\\dev\\introduction-to-asp-dot-net\\docs\\md",
        "C:\\dev\\introduction-to-asp-dot-net\\docs\\md\\step1\\step1.md",
        "C:\\dev\\introduction-to-asp-dot-net\\docs\\html"
      )
  );

var dir = path.dirname("C:\\dev\\introduction-to-asp-dot-net\\docs\\html\\step1\\step1.md");

if(fs.existsSync(dir)){
  console.log("%s はありま～す", dir);
}else{
  console.log("%s なかった...", dir);
}



