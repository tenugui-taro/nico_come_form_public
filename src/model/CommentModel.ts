export default class CommentModel {
  id: string;
  color: string;
  text: string;

  constructor(color: string, text: string) {
    this.id = `comment-${Math.random()}`;
    this.color = color;
    this.text = text;
  }
}
