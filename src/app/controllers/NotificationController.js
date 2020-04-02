import Notification from '../schemas/Notification';
import User from '../models/user';

class NotificationController {
    async index (req, res) {
        const checkIsProvider = await User.findOne({ 
            where: { 
                id: req.userId, 
                provider: true 
            }
        });

        if (!checkIsProvider) {
            return res.status(400).json({ error:'Only providers can load notifcations' });
        }

        const notifcations = await Notification.find({
            user: req.userId,
        })
        .sort({ createdAt: -1 })
        .limit(20);

        return res.json(notifcations);
    }

    async update(req, res) {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true },
        );
        
        return res.json(notification);

    }

}

export default new NotificationController();