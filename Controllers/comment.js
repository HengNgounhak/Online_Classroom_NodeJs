const Comment = require('../Models/Comment')

exports.newComment = async(req, res) => {
    const postId = req.body.postId;
    const userId = req.body.userId;
    const datetime = new Date().toLocaleString();
    const text = req.body.text;

    // create comment for database
    const comment = new Comment({
        postId: postId,
        userId: userId,
        text: text,
        datetime: datetime,
    })
    try {
        //save class to database
        const result = await comment.save()

        //if save class success res to inform
        if (result) {
            res.json({ "success": true });
        }
    } catch (error) {
        res.json({ "success": false })
    }
}

exports.getComment = (req, res) => {
    Comment.find({ postId: req.params.postId }).then(result => {
        if (result != "") {
            res.json({ "comment": result })
        } else {
            res.json({ "comment": '' })
        }
    }).catch((err) => {
        console.log(err)
    })
}

exports.deleteCmt = (req, res) => {
    const commentId = req.params.commentId;

    Comment.findByIdAndRemove(commentId)
        .then((cmt) => {
            if (cmt) {
                res.json({ success: true });
            }
        })
        .catch(err => {
            console.log(err);
        })
}