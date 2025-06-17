import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Snippet {
  @Prop({ required: true }) text: string;
  @Prop({ required: true }) summary: string;
}
