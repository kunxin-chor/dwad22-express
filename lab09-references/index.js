// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const MongoUtil = require("./MongoUtil");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

app.use(cors());
app.use(express.json());


async function main() {
    const db = await MongoUtil.connect(process.env.MONGO_URI, "dwad22_blogs")
 
    // Define a simple route
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.post('/posts/:postId/comments', async function (req,res){
        // validation: make sure that post exists!
        const post = await db.collection("posts").findOne({
            "_id": new ObjectId(req.params.postId)
        })
        if (!post) {
            res.status(404);
            res.send({
                "error":"Post is not found"
            })
        } else {
            // first create the comment
            const response = await db.collection("comments")
                .insertOne({
                    "title": req.body.title,
                    "comments": req.body.comments,
                    "email": req.body.email,
                    "postId": new ObjectId(req.params.postId)
                })
            
            const commentId = response.insertedId;
            try {
                await db.collection("posts")
                .updateOne({
                    "_id": new ObjectId(req.params.postId),
                    "comments":{
                        $push: commentId
                    }
                });
            } catch (e) {
                await db.collection("comments")
                    .deleteOne({
                        "_id": commentId
                    })
            }
         
            res.status(200);
            
        }

    });
}

main();



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running`)
});