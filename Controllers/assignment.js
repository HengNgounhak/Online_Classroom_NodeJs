const Assignment = require('../Models/Assignment')

exports.newAssignment = async(req, res) => {

    const cId = req.body.cId;
    const title = req.body.title;
    const description = req.body.description;
    const file = req.body.file;
    const dateline = req.body.dateline;
    const score = req.body.score

    // create assignment for database
    const assignment = new Assignment({
        cId: cId,
        title: title,
        description: description,
        dateline: dateline,
        file: file,
        score: score
    })
    try {
        //save class to database
        const result = await assignment.save()
        console.log(result);
        //if save class success res to inform
        if (result) {
            res.json({ "success": true });
        }
    } catch (error) {
        res.json({ "success": false })
        console.log(error)
    }
}

exports.getAssignment = (req, res) => {
    Assignment.find({ cId: req.params.classId }).then(result => {
        if (result != "") {
            res.json({ "assignment": result })
        }
    }).catch((err) => {
        console.log(err)
    })
}

exports.getAassignment = (req, res) => {
    Assignment.find({ _id: req.params.assignmentId }).then(result => {
        if (result != "") {
            res.json({ "assignment": result[0] })
        }
    }).catch((err) => {
        console.log(err)
    })
}

exports.editAssignment = (req, res) => {
    const assignmentId = req.body.assignmentId;
    const title = req.body.title;
    const description = req.body.description;
    const file = req.body.file;
    const dateline = req.body.dateline;
    const score = req.body.score

    //rename class
    Assignment.findByIdAndUpdate(assignmentId)
        .then((assignment) => {
            assignment.title = title;
            assignment.description = description;
            assignment.file = file;
            assignment.dateline = dateline;
            assignment.score = score
            res.json({ success: true });
            return assignment.save();
        })
        .catch(err => {
            console.log(err);
        })
}

exports.deleteAssignment = (req, res) => {
    const assignmentId = req.params.assignmentId;

    Assignment.findByIdAndRemove(assignmentId)
        .then((assignment) => {
            if (assignment) {
                res.json({ success: true });
            }
        })
        .catch(err => {
            console.log(err);
        })
}