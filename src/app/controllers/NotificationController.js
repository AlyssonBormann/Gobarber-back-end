import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkIsProvider) {
      return res.status(401).json('You provider can load notification');
    }

    const notification = await Notification.find({
      user: req.userId,
    })
      .sort({ createAt: 'desc' })
      .limit(20);

    return res.json(notification);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      { new: true } // Isso faz, depois que atualizar a nova informação ele RETORNA a informação, sem isso ele só atualiza mas não retorna informação
    );

    return res.json(notification);
  }
}

export default new NotificationController();
