const notesCtrl = {};
const Note = require("../models/Note");

notesCtrl.getNotes = async (req, res) => {
  const notes = await Note.find(); //{areglo de notas    }
  res.json(notes);
};

notesCtrl.creatNotes = async (req, res) => {
  const { title, content, date, author } = req.body;
   newNote = new Note({
    title,
    content,
    date,
    author
  });

  await newNote.save();
  res.send({ message: "Note save" });
};

notesCtrl.updateNotes = async (req, res) => {
  const { title, content, author } = req.body;
  await Note.findOneAndUpdate(req.params.id, 
    {
      title,
      author,
      content,
    }
  );
  console.log(req.params.id, req.body);
  res.json({ message: "Notes update" });
};

notesCtrl.deletedNotes = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Notes Deleted" });
};

notesCtrl.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  res.json({ title: "tutuloss" });
};

module.exports = notesCtrl;
