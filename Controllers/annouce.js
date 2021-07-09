const Announce = require('../Models/Annouce')

exports.newPost = async(req, res) => {
    const cId = req.body.cId;
    const uId = req.body.uId;
    const datetime = new Date().toLocaleString();
    const text = req.body.text;
    const file = req.body.file;

    // create announce for database
    const announe = new Announce({
        cId: cId,
        uId: uId,
        text: text,
        datetime: datetime,
        file: file
    })
    try {
        //save class to database
        const result = await announe.save()

        //if save class success res to inform
        if (result) {
            res.json({ "success": true });
        }
    } catch (error) {
        res.json({ "success": false })
    }
}

exports.getPost = (req, res) => {
    Announce.find({ cId: req.params.classId }).then(result => {
        if (result != "") {
            res.json({ "post": result })
        }
    }).catch((err) => {
        console.log(err)
    })
}

exports.deletePost = (req, res) => {
    const postId = req.params.postId;

    Announce.findByIdAndRemove(postId)
        .then((post) => {
            if (post) {
                res.json({ success: true });
            }
        })
        .catch(err => {
            console.log(err);
        })
}