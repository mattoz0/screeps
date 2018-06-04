optimizer = require('Master/service.optimizer');
var roleHarvester = require('Master/role.harvester');
var roleUpgrader = require('Master/role.upgrader');
var roleBuilder = require('Master/role.builder');
var roleRepairer = require('Master/role.repairer');
var roleGuard = require('Master/role.guard');
var roleHauler = require('Master/role.hauler');
var autoSpawn = require('Master/service.autospawn');

module.exports.loop = function () {
    if(typeof Memory.haulQueue !== 'undefined') {
        Memory.haulQueue = [];
    }
    // Run Auto Spawn.
    var spawnSettings = {
        harvesters: 7,
        upgraders: 5,
        builders: 0,
        guards: 1,
        haulers: 2,
        repairers: 4
    };
    autoSpawn.run(spawnSettings);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'guard') {
            roleGuard.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
    }
}