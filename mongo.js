const mongoose = require("mongoose");

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log("Enter valid number of arguments!");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://dheeraj1994:${password}@appcluster-qldmi.mongodb.net/phoneApp?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
});
const Note = mongoose.model("Note", noteSchema);

if (process.argv.length == 5) {
  const _name = process.argv[3];
  const _number = process.argv[4];
  const phoneNumber = new Note({
    name: _name,
    number: _number
  });

  phoneNumber.save().then(response => {
    console.log(
      "added " + response.name + " number " + response.number + " to phonebook"
    );
    mongoose.connection.close();
  });
}

if (process.argv.length == 3) {
  console.log("phonebook:");
  Note.find({})
    .then(result => {
      result.forEach(entry => {
        console.log(entry.name + " " + entry.number + "\n");
      });
      mongoose.connection.close();
    })
    .catch(response => console.log(response));
} else {
  mongoose.connection.close();
  process.exit(1);
}
