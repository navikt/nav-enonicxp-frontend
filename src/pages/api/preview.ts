export default (req, res) => {
    if (req.query.secret !== 'asdf') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    res.setPreviewData({});
    res.end('Preview mode enabled');
};
