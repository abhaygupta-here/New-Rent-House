import Property from '../models/Property.js';

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createProperty = async (req, res) => {
  try {
    const property = new Property({ ...req.body, owner: req.user.id });
    const createdProperty = await property.save();
    
    // Broadcast generic event (if using socket.io)
    req.app.get('io').emit('property_added', createdProperty);

    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      if (property.owner.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to update this property' });
      }

      Object.assign(property, req.body);
      const updatedProperty = await property.save();

      req.app.get('io').emit('property_updated', updatedProperty);

      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      if (property.owner.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to delete this property' });
      }

      await property.deleteOne();
      req.app.get('io').emit('property_deleted', req.params.id);
      
      res.json({ message: 'Property removed' });
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
