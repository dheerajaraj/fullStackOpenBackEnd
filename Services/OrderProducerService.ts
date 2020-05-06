import axios from "axios";

function bail(err) {
  console.error(err);
  process.exit(1);
}

const publishToQueue = (conn, result) => {
  conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue("tasks");
    ch.sendToQueue("tasks", Buffer.from(result));
  }
};

export default { publishToQueue, bail };
