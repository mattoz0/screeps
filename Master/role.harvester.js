var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
	        var source = optimizer.closestSource(creep);
	        
            if(creep.memory.target){
	            delete(creep.memory.target);
	        }
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
             if(!typeof creep.memory.target == 'undefined' || !creep.memory.target) {
                var container = optimizer.closestContainer(creep);
                if(!container) return;
                
                creep.memory.target = container.id;
            }
            var target = Game.getObjectById(creep.memory.target);
            if(_.sum(target.store) == target.storeCapacity){
                var container = optimizer.closestContainer(creep);
                if(!container) return;
                
                creep.memory.target = container.id;
            }
            
            if(target) {
                var error = creep.transfer(target, RESOURCE_ENERGY);
                if(error == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;