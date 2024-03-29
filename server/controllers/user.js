export const profile = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json(req.user);
    } else {
        return res.status(401).json({ message: "unauthorized" });
    }
}