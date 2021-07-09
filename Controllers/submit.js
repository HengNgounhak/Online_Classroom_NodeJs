const Submit = require('../Models/Submit')

exports.newSubmit = async(req, res) => {

    const assignmentId = req.body.assignmentId;
    const userId = req.body.userId;
    const text = req.body.text;
    const file = req.body.file;
    const submitAt = req.body.submitAt;

    // create assignment for database
    const submit = new Submit({
        assignmentId: assignmentId,
        userId: userId,
        text: text,
        submitAt: submitAt,
        file: file
    })
    try {
        //save class to database
        const result = await submit.save()
            //if save class success res to inform
        if (result) {
            res.json({ "success": true });
        }
    } catch (error) {
        res.json({ "success": false })
        console.log(error)
    }
}

exports.getSubmit = (req, res) => {
    Submit.find({ assignmentId: req.params.assignmentId }).then(result => {
        if (result != "") {
            res.json({ "submit": result })
        }
    }).catch((err) => {
        console.log(err)
    })
}

exports.getAsubmit = (req, res) => {
    Submit.find({ assignmentId: req.body.assignmentId, userId: req.body.userId }).then(result => {
        if (result != "") {
            res.json({ "Submit": result[0] })
        } else {
            res.json({ "Submit": false })
        }
    }).catch((err) => {
        console.log(err)
    })
}

exports.deleteSubmit = (req, res) => {
    Submit.findOneAndRemove({ assignmentId: req.body.assignmentId, userId: req.body.userId })
        .then((result) => {
            if (result) {
                res.json({ success: true });
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.gradeSubmit = (req, res) => {

    Submit.findByIdAndUpdate(req.body.submitId)
        .then((submit) => {
            submit.score = req.body.score;
            res.json({ success: true });
            return submit.save();
        })
        .catch(err => {
            console.log(err);
        })
}