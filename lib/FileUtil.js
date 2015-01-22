// FileUtil.js
var fs = require("fs");
var path = require("path");
var Q = require("q");

/**
 *
 * usage:
 *  FileUtil.readAllFiles(path.resolve(__dirname, ".."),
 *    function(err, files){
 *      console.log(files.sort());
 *    });
 *
 * callback parameters:
 *    - err {Error} - error object
 *    - files {array} - absolute path
 *
 * @param {string} - directory path
 * @param {function} - callback function
 */
function readAllFiles(dir, callback){

  if(typeof callback != "function"){
    callback = function(err, files){  };
  }

  var dirpath = path.resolve(dir);

  var files = [];
  readFolder(dirpath, files)
    .then(function(items){
      callback(null, items);
    })
    .fail(function(err){
      callback(err, []);
    })
    .done();
}

function readFolder(dir, files){
  var deferred = Q.defer();

  fs.lstat(dir, function(err, stat){
    if(err){
      deferred.reject(err);
      return;
    }

    if(stat.isFile()){
      var filePath = path.resolve(dir);
      files.push(filePath);
      deferred.resolve(files);

    }else if(stat.isDirectory()){
      readDirectory(dir, files)
        .then(deferred.resolve.bind(deferred))
        .done();
    }else{
      deferred.reject(new Error());
    }
  });
  return deferred.promise;
}

function readDirectory(dir, files){
  var deferred = Q.defer();

  fs.readdir(dir, function(err, items){
    var promises = [];

    if(err){
      deferred.reject(err);
      return;
    }

    items.forEach(function(item){
      var dirPath = path.resolve(dir, item);
      promises.push(readFolder(dirPath, files));
    });

    Q.all(promises)
      .then(function(items){
        deferred.resolve(files);
      })
      .fail(deferred.reject.bind(deferred))
      .done();
  });

  return deferred.promise;
}

/**
 *
 * @param {string} - base path
 * @param {string} - target file
 * @param {string} - destination path
 * @return {string} - absolute file path
 */
function getDestinationPath(basePath, srcFilePath, dstPath){
  var relativePath = srcFilePath.replace(basePath + path.sep, "");
  var destinationPath = path.resolve(dstPath, relativePath);
  return destinationPath;
}

/**
 * @param {string} - source file path
 * @param {string} - destination path
 */
function copyFileSync(src, dst){
  var srcBaseName = path.basename(src);
  var dstBaseName = path.basename(dst);

  var dstPath = dst;
  if(srcBaseName !== dstBaseName){
    var stat = fs.lstatSync(dstPath);
    if(stat.isDirectory()){
      dstPath = path.join(dst, srcBaseName);
    }
  }

  // ファイルコピー
  fs.linkSync(src, dstPath);
}

// export function
module.exports = {
  readAllFiles: readAllFiles,
  getDestinationPath: getDestinationPath,
  copyFileSync: copyFileSync
};

