import { injectable, inject } from 'tsyringe';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

interface IRequest {
  content: string;
  recipient_id: string;
}

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    content,
    recipient_id,
  }: IRequest): Promise<Notification> {
    const notification = await this.notificationsRepository.create({
      content,
      recipient_id,
    });
    return notification;
  }
}

export default CreateNotificationService;
