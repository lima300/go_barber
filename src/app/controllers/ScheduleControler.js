import Appointment from '../models/Appointment';
import User from '../models/user';
import { parseISO, isBefore } from 'date-fns';

class ScheduleController {
    async index (req, res) {
        const checkUserProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkUserProvider) {
            return res.status(401).json({ error: 'User is not a provider' });
        }

        const  date  = parseISO(req.query.date);

        const appointments = await Appointment.findAll({
            where: { provider_id: req.userId, canceled_at: null }
        });


        return res.json({ appointments });
    }
}

export default new ScheduleController();