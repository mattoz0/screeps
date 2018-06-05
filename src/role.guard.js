let roleGuard = {
  run: function (creep) {
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
      if (creep.attack(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: {stroke: '#ff1900'}});
      }
    }
    // else idle
  }
}
module.exports = roleGuard;