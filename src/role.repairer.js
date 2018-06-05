let roleRepairer = {
  run: function (creep) {
    if (creep.memory.repairing && creep.carry.energy == 0) {
      creep.memory.repairing = false;
      creep.say('🔄 harvest');

      // Cache the target to improve performance.
      creep.memory.target = optimizer.closestContainer(creep, true).id;
    }
    if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
      creep.memory.repairing = true;
      creep.say('🚧 Repair');
    }

    if (creep.memory.repairing) {
      let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function (object) {
          return object.hitsMax > object.hits;
        }
      });
      if (creep.repair(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: {stroke: '#00ffe5'}});
      }
    }
    else {
      if (!typeof creep.memory.target == 'undefined' || !creep.memory.target) {
        if (!target) {
          return;
        }
        creep.memory.target = optimizer.closestContainer(creep, true).id;
      }
      let target = Game.getObjectById(creep.memory.target);

      if (target) {
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    }
  }
};

module.exports = roleRepairer;