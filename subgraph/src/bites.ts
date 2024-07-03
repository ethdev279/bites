import { BiteCreated, CommentedOnBite } from "../generated/Bites/Bites";
import { Bite, Comment, User } from "../generated/schema";

export function handleBiteCreated(event: BiteCreated): void {
  // CREATE USER
  let user = User.load(event.params.author);
  if (user == null) {
    user = new User(event.params.author);
    user.address = event.params.author.toHex();
    user.createdAt = event.block.timestamp;
    user.updatedAt = event.block.timestamp;
    user.save();
  }

  // CREATE BITE
  const bite = new Bite(event.params.id.toString());
  bite.content = event.params.content;
  bite.imageHash = event.params.imageHash;
  bite.author = event.params.author;
  bite.createdAt = event.block.timestamp;
  bite.updatedAt = event.block.timestamp;
}

export function handleCommentedOnBite(event: CommentedOnBite): void {
  // CREATE USER
  let user = User.load(event.params.author);
  if (user == null) {
    user = new User(event.params.author);
    user.address = event.params.author.toHex();
    user.createdAt = event.block.timestamp;
    user.updatedAt = event.block.timestamp;
    user.save();
  }

  // CREATE COMMENT
  const comment = new Comment(event.params.id.toString());
  comment.content = event.params.content;
  comment.author = event.params.author;
  comment.createdAt = event.block.timestamp;
  comment.updatedAt = event.block.timestamp;
  comment.save();
}
