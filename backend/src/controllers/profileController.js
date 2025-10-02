import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username },
      { new: true, runValidators: true }
    ).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
