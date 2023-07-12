import { PartialType } from '@nestjs/swagger';
import { CreateSubscriberDto } from './create-subscriber.dto';

export class UpdateSubscriberDto extends PartialType(CreateSubscriberDto) {}
