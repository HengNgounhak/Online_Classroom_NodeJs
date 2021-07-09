const File = require('../Models/File')

exports.newFile = async(req, res) => {

    const cId = req.body.cId;
    const name = req.body.name;
    const dateAdd = req.body.dateAdd;

    // create assignment for database
    const file = new File({
        cId: cId,
        name: name,
        dateAdd: dateAdd
    })
    try {
        //save class to database
        const result = await file.save()
            //if save class success res to inform
        if (result) {
            res.json({ "success": true });
        }
    } catch (error) {
        res.json({ "success": false })
        console.log(error)
    }
}

exports.getFile = (req, res) => {
    File.find({ cId: req.params.classId }).then(result => {
        res.json({ "file": result })
    }).catch((err) => {
        console.log(err)
    })
}

exports.deleteFile = (req, res) => {
    File.findOneAndRemove({ _id: req.params.fileId })
        .then((result) => {
            if (result) {
                res.json({ success: true });
            }
        })
        .catch(err => {
            console.log(err);
        })
}