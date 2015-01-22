// index.js
"use strict";

var fs = require("fs");
var path = require("path");
var util = require("util");
var marked = require("marked");
var ECT = require("ect");
var extend = require("extend");
var Q = require("q");

var FileUtil = require("./FileUtil");

(function(){

  var _config;
  var _renderer;  // ECT.renderer

  function initialize(){
    // markedの設定
    marked.setOptions({
      highlight: function(code){
        return require("highlight.js").highlightAuto(code).value;
      }
    });

    // configファイルの読み込み
    loadConfig();

    // ectの設定
    getRenderer();
  }

  function loadConfig(){
    var defaultConfig = {
      template: path.join(__dirname, "template"),
      src: path.join(__dirname, "markdown"),
      dst: path.join(__dirname, "html"),
      title: "hoge",
      copyright: "2015 Kazunori Kimura",
      project: "my project"
    };

    var config = {};

    if(fs.existsSync("./converter.json")){
      config = require("./converter.json");
    }

    _config = extend(defaultConfig, config);
  }

  function getRenderer(){
    var rendererOptions = {
      root: _config.template,
      ext: ".ect"
    };

    _renderer = ECT(rendererOptions);
  }

  /**
   * markdown -> html変換
   * @param {string} - markdown file path
   * @return {string} - html
   */
  function parse(srcPath){
    var data = fs.readFileSync(strPath, {encoding: "utf8"});
    return marked(data);
  }

  /**
   * viewの内容を反映
   */
  function render(html){
    var data = {
      content: html,
      title: _config.title,
      project: _config.project,
      copyright: _config.copyright
    };

    return _renderer.render("template.ect", data);
  }



  function convert(markdownPath, destinationPath){

  }

})();
