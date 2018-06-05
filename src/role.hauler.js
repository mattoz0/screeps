let roleHauler = {
  run: function (creep) {
    // What are we currently doing?
    if (creep.memory.hauling && creep.carry.energy == 0) {
      creep.memory.hauling = false;
      creep.say('🔄 Getting Delivery');

      // Cache the target to improve performance.
      creep.memory.target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function (structure) {
          return structure.structureType == STRUCTURE_CONTAINER &&
            _.sum(structure.store) <= structure.storeCapacity;
        }
      }).id;
    }
    if (!creep.memory.hauling && creep.carry.energy == creep.carryCapacity) {
      creep.memory.hauling = true;
      creep.say('🚧 Delivering');
    }

    //
    if (creep.memory.hauling) {
      let targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });

      if (targets.length > 0) {
        let transfer = creep.transfer(targets[0], RESOURCE_ENERGY);
        if (transfer == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    }
    else {
      if (!typeof creep.memory.target == 'undefined' || !creep.memory.target) {
        creep.memory.target = optimizer.closestContainer(creep).id;
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

module.exports = roleHauler;