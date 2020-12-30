const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test-ref-db", { useUnifiedTopology: true, useNewUrlParser: true } );

const nestedSchema = {
    content: String
}
const userSchema = {
    name: String,
    nested: [nestedSchema]
}

const Test = mongoose.model("Test", userSchema);

(async () => {
    
    const test = new Test({
        name: "Jacob"
    })

    test.nested.push({content: "something else here"}, {content: "hello there"},
        {content: "more"}, {content: "even more content"}
    );

    test.save();

    console.log("done");
});


(async () => {
    const test = await Test.findOne({name: "Jacob"})
    console.log(test);
    const test_id = test._id;
    const nested_id = test.nested[3]._id;
    console.log(nested_id);

    const found = await Test.findOne({"nested._id": nested_id}).select("nested.$")
    console.log(found.nested[0]);
})();