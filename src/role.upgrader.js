let roleUpgrader = {
  /** @param {Creep} creep **/
  run: function (creep) {

    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');

      // Cache the target to improve performance.
      creep.memory.target = optimizer.closestContainer(creep, true).id;
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if (creep.memory.upgrading) {
      if (creep.room.controller) {
        if (creep.room.controller.sign.username != 'Artsadistic') {
          if (creep.signController(creep.room.controller, "Owned & Opperated by Artsadistic.") == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
        else {
          if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }

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

module.exports = roleUpgrader;