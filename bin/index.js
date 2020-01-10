#!/usr/bin/env node
const program = require('commander');
const { exec } = require('child_process');
const allList = ["git", "npm", "yarn", "docker"]

const notSupport = app => `App ${app} is not supported`
const commandLine = {
  reset: {
    // git: ["git config --global --unset https.proxy", "git config --global --unset http.proxy"]
    git: ["git config --global --unset https.proxy"],
    yarn: ["yarn config delete proxy", "yarn config delete https-proxy"]
  }
}

let cmdValue, envValue
program
  .version(require('../package.json').version)

program.command("reset <app>").action(app => {
  let execList = allList
  if (app !== "all" && allList.indexOf(app) < 0) {
    console.log(notSupport(app))
    return
  }
  if (app !== "all") execList = [app]

  execList.forEach(execApp => {
    exec(commandLine["reset"][execApp].join(" & "), (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(stdout)
    })
    console.log(`reset App ${execApp} is done.`)
  })
})

program.command("add <app>").action(app => {
  exec("ls", (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout)
  })
  // console.log(`add App ${app} is done.`)
}
)

program.parse(process.argv);

