// Create web server
var express = require('express');
var router = express.Router();

// Create database connection
var db = require('../database');

// Create a new comment
router.post('/', function(req, res, next) {
  var comment = {
    id: null,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
    content: req.body.content,
    created_at: new Date()
  };

  var sql = 'INSERT INTO comments SET ?';
  db.query(sql, comment, function(err, result) {
    if (err) {
      res.status(500).json({ status: 'error' });
    } else {
      comment.id = result.insertId;
      res.json(comment);
    }
  });
});

// Update a comment
router.put('/:id', function(req, res, next) {
  var comment = {
    content: req.body.content
  };

  var sql = 'UPDATE comments SET ? WHERE id = ?';
  db.query(sql, [comment, req.params.id], function(err, result) {
    if (err) {
      res.status(500).json({ status: 'error' });
    } else {
      res.json({ status: 'success' });
    }
  });
});

// Delete a comment
router.delete('/:id', function(req, res, next) {
  var sql = 'DELETE FROM comments WHERE id = ?';
  db.query(sql, req.params.id, function(err, result) {
    if (err) {
      res.status(500).json({ status: 'error' });
    } else {
      res.json({ status: 'success' });
    }
  });
});

module.exports = router;