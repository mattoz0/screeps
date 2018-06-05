optimizer = require('service.optimizer');
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let roleGuard = require('role.guard');
let roleHauler = require('role.hauler');
let autoSpawn = require('service.autospawn');

module.exports.loop = function () {
  if (typeof Memory.haulQueue !== 'undefined') {
    Memory.haulQueue = [];
  }
  // Run Auto Spawn.
  let spawnSettings = {
    harvesters: 7,
    upgraders: 5,
    builders: 0,
    guards: 1,
    haulers: 2,
    repairers: 4
  };
  autoSpawn.run(spawnSettings);

  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role === 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role === 'guard') {
      roleGuard.run(creep);
    }
    if (creep.memory.role === 'repairer') {
      roleRepairer.run(creep);
    }
    if (creep.memory.role === 'hauler') {
      roleHauler.run(creep);
    }
  }
}