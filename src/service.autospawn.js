let autoSpawn = {

  /** @param {Creep} creep **/
  run: function (settings) {
    // Check if we need any additional Haulers.
    let haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    if (haulers.length < settings.haulers) {
      var newName = 'Hauler' + Game.time;
      console.log('Spawning new Hauler: ' + newName);
      Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, MOVE, MOVE], newName,
        {memory: {role: 'hauler', hauling: true}});
    }
    // Check if we need any addition Havesters.
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < settings.harvesters) {
      let newName = 'Harvester' + Game.time;
      console.log('Spawning new harvester: ' + newName);
      Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName,
        {memory: {role: 'harvester'}});
    }
    // Check if we need any addition Builders.
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < settings.builders) {
      let newName = 'Builder' + Game.time;
      console.log('Spawning new builder: ' + newName);
      Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'builder', building: true}});
    }
    // Check if we need any addition Upgraders.
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < settings.upgraders) {
      let newName = 'Upgrader' + Game.time;
      console.log('Spawning new upgrader: ' + newName);
      Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'upgrader', upgrading: true}});
    }
    // Check if we need any addition Upgraders.
    let guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
    if (guards.length < settings.guards) {
      let newName = 'Guard' + Game.time;
      console.log('Spawning new Guard: ' + newName);
      Game.spawns['Spawn1'].spawnCreep([ATTACK, ATTACK, MOVE], newName,
        {memory: {role: 'guard'}});
    }
    // Check if we need any additional Repairers.
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    if (repairers.length < settings.repairers) {
      let newName = 'Repairer' + Game.time;
      console.log('Spawning new Repairer: ' + newName);
      Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'repairer', repairing: true}});
    }
    // Clean up dead creeps.
    let room = Game.spawns.Spawn1.room;
    room.find(FIND_TOMBSTONES).forEach(tombstone => {
      for (let i in Memory.creeps) {
        if (!Game.creeps[i]) {
          delete Memory.creeps[i];
        }
      }
    });
  }

};

module.exports = autoSpawn;