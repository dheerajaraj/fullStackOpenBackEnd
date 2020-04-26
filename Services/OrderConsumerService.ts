function bail(err) {
  console.error(err);
  process.exit(1);
}

// Consumer
function consumer(conn) {
  var ok = conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue("tasks");
    ch.consume("tasks", function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  }
}

export default { consumer, bail };
