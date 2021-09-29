const isAlive = (req, res) => {
    return res.status(200).json({ message: 'Ok!' });
};

export default isAlive;
