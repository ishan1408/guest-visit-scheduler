import Visit from '../models/Visit.js';

export const createVisit = async (req, res) => {
  try {
    const visit = new Visit(req.body);
    await visit.save();
    return res.status(201).json({ message: 'Visit created successfully', data: visit });
  } catch (err) {
    return res.status(400).json({ message: 'Failed to create visit', error: err.message });
  }
};

export const getVisits = async (req, res) => {
  try {
    // optional: support pagination & filtering
    const { page = 1, limit = 10, status } = req.query;
    const filter = status ? { status } : {};

    const visits = await Visit.find(filter)
      .sort({ visitAt: 1 }) // earliest first
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Visit.countDocuments(filter);

    return res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: visits,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch visits', error: err.message });
  }
};

export const getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit) return res.status(404).json({ message: 'Visit not found' });
    return res.json({ data: visit });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid request', error: err.message });
  }
};

export const updateVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!visit) return res.status(404).json({ message: 'Visit not found' });
    return res.json({ message: 'Visit updated', data: visit });
  } catch (err) {
    return res.status(400).json({ message: 'Failed to update visit', error: err.message });
  }
};

export const deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    if (!visit) return res.status(404).json({ message: 'Visit not found' });
    return res.json({ message: 'Visit deleted' });
  } catch (err) {
    return res.status(400).json({ message: 'Failed to delete visit', error: err.message });
  }
};
