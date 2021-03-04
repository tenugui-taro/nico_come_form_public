import { commentColor } from "@/store/commentColor";
export default class CommentModel {
  id: string;
  color: string;
  text: string;
  timestamp: number;

  constructor(text: string) {
    this.id = `comment-${Math.random()}`;
    this.color = commentColor.value;
    this.text = text;
    this.timestamp = Date.now();
  }
}
