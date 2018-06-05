/**
 * Service Queue.
 *
 * The queue service is intended to make sure no builders are waiting without
 * materials for too long. This works by creating a ticketing system so
 * they are serviced in order.
 **/
let serviceQueue = {
  addTicket: function (creep) {
    Memory.haulQueue.push(creep.id);
  },
  nextTicket: function () {
    return Memory.haulQueue.pop();
  }
};

module.exports = serviceQueue;