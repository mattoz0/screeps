var optimizer = {
    createRoad: function (from, to) {
        var room = Game.spawns.Spawn1.room;
        var path = room.findPath(from, to, {ignoreCreeps:true});
        var i;
        for (i = 0; i < path.length; i++) { 
            room.createConstructionSite(path[i].x,path[i].y,STRUCTURE_ROAD);
        }
    },
    closestSource: function (creep){
        return creep.pos.findClosestByPath(FIND_SOURCES);
    },
    closestContainer: function (creep, pickup) {
        // console.log('CreepName: ' + creep.name);
        if(pickup){
            return creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function(structure) {
                        var eval1 =  _.sum(structure.store) <= structure.storeCapacity;
                        //console.log("Pickup True Value: " + _.sum(structure.store) + " Capacity: " + structure.storeCapacity + " Eval: "+eval1);
                        return structure.structureType == STRUCTURE_CONTAINER &&
                        _.sum(structure.store) <= structure.storeCapacity &&
                        _.sum(structure.store) != 0;
                    }
	            });
        } else {
            
            return creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function(structure) {
                        
                        var eval1 =  _.sum(structure.store) < structure.storeCapacity;
                        // console.log("Pickup: False Value: " + _.sum(structure.store) + " Capacity: " + structure.storeCapacity + " Eval: "+eval1);
                        return structure.structureType == STRUCTURE_CONTAINER &&
                        _.sum(structure.store) < structure.storeCapacity;
                    }
	            });
        }
    }
};
// require('service.optimizer').createRoad(new RoomPosition(), new RoomPosition(), Game);
// require('service.optimizer').createRoad(new RoomPosition(27,5, 'E59S13'), new RoomPosition(38,10,'E59S13'), Game);
module.exports = optimizer;