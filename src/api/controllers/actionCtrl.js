const config = require('./../../config');
const rosnodejs = require('rosnodejs');
const Twist = rosnodejs.require('geometry_msgs').msg.TwistStamped;


exports.postAction = function(req, res) {

  rosnodejs.initNode('/simulation', {
      onTheFly: true
    }).then((rosNode) => {
      let cmd_vel_publisher = rosNode.advertise('/pumagri/auto_cmd_vel', 'geometry_msgs/TwistStamped', {
        queueSize: 1,
        latching: true,
        throttleMs: 9
      });
      const TwistStamped = rosnodejs.require('geometry_msgs').msg.TwistStamped;
      let realposx = req.body.Myposx;
      let realposz = req.body.Myposz;

      var msgTwist = new TwistStamped();
      msgTwist.twist.linear.x = realposx;
      msgTwist.twist.angular.z = realposz;
      console.log(msgTwist);
      cmd_vel_publisher.publish(msgTwist);
    })
    .catch(function(error) {
      rodenodejs.eventNames();
    });
};


/*
 * A postAction
 * @input move - Movement requested by the client
 * @return response
 */
