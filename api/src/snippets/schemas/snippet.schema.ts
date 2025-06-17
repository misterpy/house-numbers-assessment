import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Snippet {
  @Prop({ required: true }) text: string;
  @Prop({ required: true }) summary: string;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);
