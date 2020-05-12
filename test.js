const mongoose = require("mongoose");

//1. create a connection to database / mongoose.connect returns a promise
const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatever", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

//2. create a schema
const student = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    favFoot: [{ type: String }],
    info: {
      school: {
        type: String,
      },
      shoeSize: {
        type: Number,
      },
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "school",
    },
  },
  { timestamps: true }
);

const school = new mongoose.Schema({
  name: String,
  openSince: Number,
  students: Number,
  isGreat: Boolean,
  staff: [{}],
});

//3. convert the schema to a mangoose model and that model is gonna create a collection
const School = mongoose.model("school", school);
const Student = mongoose.model("student", student);

// Connect to the db
/*
connect()
  .then(async (connection) => {
   
    
    console.log(student);
  })
  .catch((e) => console.log(e));*/

connect()
  .then(async (connection) => {
    /*
    //create a new entry
    const student = await Student.create({ firstName: "Tim" });
    //find an entry
    const found = await Student.find({ firstName: "Tai" });
    const wildCard = await Student.find({}); //empty object
    const foundById = await Student.findById("5ead6626cc75bb32d4094041"); //return null if not exist
    const updated = await Student.findByIdAndUpdate();
*/

    // const school = await School.create({ name: "MLK Elementary" });

    // const student2 = await Student.create({
    //   firstName: "Elena",
    //   school: school._id,
    // });
    // const student3 = await Student.create({
    //   firstName: "Maria",
    //   school: school._id,
    // });

    // console.log(student2);

    // const match = await Student.findById(student.id).populate("school").exec();
    const schoolConfig = {
      name: "nlk elementary",
      openSince: 2009,
      students: 1000,
      isGreat: true,
    };

    const otherSchool = {
      name: "Larry Middle Scool",
      openSince: 1980,
      students: 600,
      isGreat: false,
    };
    const schools = await School.create([schoolConfig, otherSchool]);
    const match = await School.findOne({
      students: { $gt: 500 },
      openSince: { $lt: 2000 },
      isGreat: true,
    }).exec();

    // const scool2 = await School.findOneAndUpdate(
    //   { name: "nlk elementary" },
    //   { name: "nlk elementary" },
    //   { upsert: true, new: true }
    // ).exec();
    console.log("************************", match, "**************");
  })
  .catch((e) => console.log("error AT: ", e));
