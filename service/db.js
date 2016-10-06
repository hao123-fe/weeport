var DataStore = require('nedb')
var projectDB = new DataStore({filename: '../db/project.db'})
var taskDB = new DataStore({filename: '../db/task.db'})

projectDB.loadDatabase()
taskDB.loadDatabase()

function checkProjcet(title) {
  return new Promise(function (resolve, reject) {
    projectDB.find({title: title}, function (err, docs) {
      err ? reject(err) : resolve(!!docs.length)
    })
  })
}

function addProject(options) {
  return function (exist) {
    return new Promise(function (resolve, reject) {
      !exist && projectDB.insert({
        title: options.title,
        date: options.date
      }, function (err, docs) {
        err ? reject(err) : resolve(!!docs.length)
      })
    })
  }
}

module.exports = {
  queryProject(options = {}) {

  },
  createProject (options = {}) {
    return checkProjcet(options.title)
      .then(addProject(options))
  },
  updateProject (id, options = {}) {

  },
  removeProject (id) {

  },
  queryWork (options = {}) {

  },
  createWork (options = {}) {

  },
  updateWork (id, options = {}) {

  },
  removeWork (id) {

  }
}
