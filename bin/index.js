#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const statement = chalk.magenta
const appName = chalk.yellow
const { exec } = require('child_process');
const allList = ["git", "npm", "yarn"]

const notSupport = app => `App ${app} is not supported`
const commandLine = {
  list: {
    git: ["git config --global --list"],
    npm: ["npm config list"],
    yarn: ["yarn config list"],
  },
  add: {
    git: ["git config --global http.proxy", "git config --global https.proxy"],
    npm: ["npm config set proxy", "npm config set https-proxy"],
    yarn: ["yarn config set proxy", "yarn config set https-proxy"],
  },
  reset: {
    git: ["git config --global --unset https.proxy", "git config --global --unset http.proxy"],
    npm: ["npm config delete proxy", "npm config delete https-proxy"],
    yarn: ["yarn config delete proxy", "yarn config delete https-proxy"]
  },
}

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
      console.log(`${statement("Reset App")} ${appName(execApp)}${statement("'s Proxy...")} \r\n`)
      console.log(stdout)
      console.log(`${statement("Reset App")} ${appName(execApp)} ${statement("'s Proxy is done.")} \r\n`)
    })
  })
})

program.command("list <app>").action(app => {
  let execList = allList
  if (app !== "all" && allList.indexOf(app) < 0) {
    console.log(notSupport(app))
    return
  }
  if (app !== "all") execList = [app]

  execList.forEach(execApp => {
    exec(commandLine["list"][execApp].join(" & "), (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`${statement("List App")} ${appName(execApp)}${statement("...")} \r\n`)
      console.log(stdout)
      console.log(`${statement("List App")} ${appName(execApp)} ${statement("is done.")} \r\n`)
    })
  })
})

program.command("add <app> <addr>").action((app, addr) => {
  let execList = allList
  if (app !== "all" && allList.indexOf(app) < 0) {
    console.log(notSupport(app))
    return
  }
  if (app !== "all") execList = [app]

  execList.forEach(execApp => {
    const lines = commandLine["add"][execApp].map(line => `${line} ${addr}`)
    exec(lines.join(" & "), (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`${statement("Add Proxy For App")} ${appName(execApp)}${statement("...")}`)
      console.log(stdout)
      console.log(`${statement("Add Proxy For App")} ${appName(execApp)} ${statement("is done.")} \r\n`)
    })
  })
})

program.parse(process.argv);

