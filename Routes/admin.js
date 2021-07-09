const express = require("express");
const router = express.Router();
const authenController = require("../Controllers/authentication");
const myClass = require("../Controllers/class");
const announce = require('../Controllers/annouce');
const comment = require("../Controllers/comment");
const assignment = require("../Controllers/assignment")
const submit = require("../Controllers/submit")
const file = require("../Controllers/file")

router.post('/register', authenController.register);
router.post('/login', authenController.login);
router.post('/logout', authenController.logout);
router.post('/getUser', authenController.getUser);
router.post('/getPerson/:userId', authenController.getPerson);
// router.post('/updateProfile/:userId', authenController.updateProfile);
router.post('/updateUser/:userId', authenController.updateUser);

router.post('/create', myClass.create);
router.put('/join', myClass.join);
router.post('/getClass', myClass.getClass);
router.put('/renameClass/:classId', myClass.renameClass);
router.delete('/deleteClass/:classId', myClass.deleteClass);
router.put('/leaveClass/:classId', myClass.leaveClass);
router.post('/aClass/:classId', myClass.aClass);

router.post('/newPost', announce.newPost);
router.post('/getPost/:classId', announce.getPost);
router.delete('/deletePost/:postId', announce.deletePost);

router.post('/newComment', comment.newComment);
router.post('/getComment/:postId', comment.getComment);
router.delete('/deleteCmt/:commentId', comment.deleteCmt);

router.post('/newAssignment', assignment.newAssignment);
router.post('/getAssignment/:classId', assignment.getAssignment);
router.post('/getAassignment/:assignmentId', assignment.getAassignment);
router.post('/editAssignment', assignment.editAssignment);
router.delete('/deleteAssignment/:assignmentId', assignment.deleteAssignment);

router.post('/newSubmit', submit.newSubmit);
router.post('/getAsubmit', submit.getAsubmit);
router.post('/deleteSubmit', submit.deleteSubmit);
router.post('/getSubmit/:assignmentId', submit.getSubmit);
router.post('/gradeSubmit', submit.gradeSubmit);

router.get('/getFile/:classId', file.getFile);
router.post('/newFile', file.newFile);
router.delete('/deleteFile/:fileId', file.deleteFile);

module.exports = router;