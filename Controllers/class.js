const Class = require('../Models/Class');

exports.create = async(req, res) => {
    const name = req.body.name;
    const tId = req.body.tId;
    const code = Math.random().toString(36).substr(2, 6) //generate  code from first 6 digits of 36 digits of number and letter

    // create class for database
    const myClass = new Class({
        name: name,
        code: code,
        teacher: tId
    })
    try {
        //save class to database
        const result = await myClass.save()

        //if save class success res to inform
        if (result) {
            res.json({ "success": true });
        }
    } catch (error) {
        res.json({ "success": false })
    }
}

exports.getClass = (req, res) => {
    userId = req.body.userId;

    //get class
    Class.find()
        .then(result => {
            var myClass = [];
            //find classes that have this user
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < result[i].teacher.length; j++) {
                    if (result[i].teacher[j] == userId) {
                        myClass.push(result[i]);
                    }
                }
                for (var k = 0; k < result[i].student.length; k++) {
                    if (result[i].student[k] == userId) {
                        myClass.push(result[i]);
                    }
                }
            }
            res.json(myClass);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.renameClass = (req, res) => {
    const classId = req.params.classId;
    const name = req.body.name;

    //find if user rename same as other
    Class.find({ name: name }).then(result => {
        if (result == "") {
            //rename class
            Class.findByIdAndUpdate(classId)
                .then((myClass) => {
                    myClass.name = name;
                    res.json({ success: true });
                    return myClass.save();
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            res.json({ success: false });
        }
    }).catch(err => {
        console.log(err)
    })
}

exports.deleteClass = (req, res) => {
    //delete todo
    const classId = req.params.classId;

    Class.findByIdAndRemove(classId)
        .then((myClass) => {
            res.json({ "success": true });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.join = (req, res) => {
    const code = req.body.code
    const sId = req.body.sId

    //find if user rename same as other
    Class.find({ code: code }).then(result => {
        if (result != "") {
            //add student to class
            Class.findByIdAndUpdate(result[0]._id)
                .then((myClass) => {
                    myClass.student.push(sId);
                    res.json({ success: true });
                    return myClass.save();
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            res.json({ success: false });
        }
    }).catch(err => {
        console.log(err)
    })
}

exports.leaveClass = (req, res) => {
    const classId = req.params.classId;
    const sId = req.body.sId

    //remove student to from class
    Class.findByIdAndUpdate(classId)
        .then((result) => {
            //find classes that have this user
            for (var k = 0; k < result.student.length; k++) {
                if (result.student[k] == sId) {
                    result.student.splice(k, 1);
                    res.json({ success: true });
                }
            }
            if (req.body.makeAsTeacher) {
                result.teacher.push(sId);
            }
            return result.save();
        })
        .catch(err => {
            console.log(err);
        })

}

exports.aClass = (req, res) => {
    const cId = req.params.classId;

    Class.find({ _id: cId }).then(result => {
        if (result != "") {
            res.json({ myClass: result[0] })
        } else {
            res.json({ success: false });
        }
    }).catch(err => {
        console.log(err)
    })
}