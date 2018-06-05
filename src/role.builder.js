let roleHarvester = require('role.harvester');

let roleBuilder = module.exports = {

  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');

      // Cache the target to improve performance.
      creep.memory.target = optimizer.closestContainer(creep, true).id;
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      let target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if (target) {
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    }
    else {
      if (!typeof creep.memory.target == 'undefined' || !creep.memory.target) {
        if (!creep.memory.target) {
          return;
        }
        creep.memory.target = optimizer.closestContainer(creep, true).id;
      }
      let target = Game.getObjectById(creep.memory.target);

      if (target) {
        let error = creep.withdraw(target, RESOURCE_ENERGY);
        if (error == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        if (error == ERR_NOT_ENOUGH_RESOURCES) {
          creep.memory.target = optimizer.closestContainer(creep, true).id;
        }

      }

    }
  }
};
