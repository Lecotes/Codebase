const express = require('express');
const pool = require('../db');
const router = express.Router();

// Add an annotation (merging logic included)
router.post('/create', async (req, res) => {
    const { textId, userId, content, rangeStart, rangeEnd } = req.body;

    try {
        // Find overlapping annotations
        const overlappingAnnotations = await pool.query(
            `SELECT * FROM annotations 
             WHERE text_id = $1 
             AND NOT (range_end <= $2 OR range_start >= $3)`,
            [textId, rangeStart, rangeEnd]
        );

        if (overlappingAnnotations.rows.length > 0) {
            const targetAnnotation = overlappingAnnotations.rows[0];
            const mergedRangeStart = Math.min(rangeStart, targetAnnotation.range_start);
            const mergedRangeEnd = Math.max(rangeEnd, targetAnnotation.range_end);

            // Update the target annotation to reflect the merged range
            await pool.query(
                `UPDATE annotations 
                 SET range_start = $1, range_end = $2, updated_at = NOW() 
                 WHERE id = $3`,
                [mergedRangeStart, mergedRangeEnd, targetAnnotation.id]
            );

            // Add the new content as a reply to the merged annotation
            await pool.query(
                `INSERT INTO annotation_replies (annotation_id, user_id, content) 
                 VALUES ($1, $2, $3)`,
                [targetAnnotation.id, userId, content]
            );

            res.status(201).json({ message: 'Annotation merged successfully' });
        } else {
            // Create a new annotation
            const result = await pool.query(
                `INSERT INTO annotations (text_id, user_id, content, range_start, range_end) 
                 VALUES ($1, $2, $3, $4, $5) 
                 RETURNING *`,
                [textId, userId, content, rangeStart, rangeEnd]
            );
            res.status(201).json(result.rows[0]);
        }
    } catch (err) {
        console.error('Error creating annotation:', err);
        res.status(500).send('Error creating annotation');
    }
});

// Fetch annotations grouped by group_id
router.get('/:textId', async (req, res) => {
    const { textId } = req.params;

    try {
        // Fetch annotations with usernames
        const annotations = await pool.query(
            `SELECT a.*, u.username 
             FROM annotations a
             JOIN users u ON a.user_id = u.id
             WHERE text_id = $1 
             ORDER BY range_start ASC`,
            [textId]
        );

        // Fetch replies with usernames
        const replies = await pool.query(
            `SELECT r.*, u.username 
             FROM annotation_replies r
             JOIN users u ON r.user_id = u.id
             WHERE r.annotation_id IN (
                SELECT id FROM annotations WHERE text_id = $1
             )
             ORDER BY created_at ASC`,
            [textId]
        );

        res.status(200).json({
            annotations: annotations.rows,
            replies: replies.rows,
        });
    } catch (err) {
        console.error('Error fetching annotations:', err);
        res.status(500).send('Error fetching annotations');
    }
});

// Upvote or downvote an annotation
router.post('/:id/vote', async (req, res) => {
    const { id } = req.params;
    const { userId, voteValue } = req.body;

    try {
        const existingVote = await pool.query(
            'SELECT * FROM annotation_votes WHERE annotation_id = $1 AND user_id = $2',
            [id, userId]
        );

        if (existingVote.rows.length) {
            return res.status(400).send('User has already voted');
        }

        await pool.query(
            `INSERT INTO annotation_votes (annotation_id, user_id, vote_value) 
             VALUES ($1, $2, $3)`,
            [id, userId, voteValue]
        );

        await pool.query(
            `UPDATE annotations 
             SET votes = votes + $1 
             WHERE id = $2`,
            [voteValue, id]
        );

        res.status(200).send('Vote recorded');
    } catch (err) {
        console.error('Error recording vote:', err);
        res.status(500).send('Error recording vote');
    }
});

// Upvote or downvote a reply
router.post('/:replyId/reply-vote', async (req, res) => {
    const { replyId } = req.params;
    const { userId, voteValue } = req.body;

    try {
        const existingVote = await pool.query(
            'SELECT * FROM reply_votes WHERE reply_id = $1 AND user_id = $2',
            [replyId, userId]
        );

        if (existingVote.rows.length) {
            return res.status(400).send('User has already voted');
        }

        await pool.query(
            `INSERT INTO reply_votes (reply_id, user_id, vote_value) 
             VALUES ($1, $2, $3)`,
            [replyId, userId, voteValue]
        );

        await pool.query(
            `UPDATE annotation_replies 
             SET votes = votes + $1 
             WHERE id = $2`,
            [voteValue, replyId]
        );

        res.status(200).send('Vote recorded');
    } catch (err) {
        console.error('Error recording vote:', err);
        res.status(500).send('Error recording vote');
    }
});

module.exports = router;
