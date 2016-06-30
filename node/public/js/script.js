var output_messages = document.getElementById("messages");
var output_distance = document.getElementById("distance");
var client = mqtt.connect('ws://iot.eclipse.org:80/ws'); // you add a ws:// url here

client.subscribe("coffeefy/messages");
client.subscribe("coffeefy/sensors/ultrasonic");

client.on("message", function(topic, payload) {
  if (topic=="coffeefy/messages") {
    output_messages.innerHTML = payload;
    $(document).ready(function(){
      if(payload.length > 5){
        $('.btn').prop('disabled', true);
      } else {
        $('.btn').prop('disabled', false);
      }
    })
  }
  if (topic=="coffeefy/sensors/ultrasonic") {
    //output_distance.innerHTML = payload;
    $(document).ready(function(){
      if(payload > 5){
        $('.btn').prop('disabled', true);
        $('#distance').html('no Cup !');
      } else {
        $('.btn').prop('disabled', false);
        $('#distance').html('OK');
      }
    })
  }
});
client.publish("coffeefy", "hi, this is browser!");
