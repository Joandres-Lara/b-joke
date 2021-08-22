export default class NewsItem {
 constructor(
  { id, link, image, author, description, content, created_at, rss, title },
  typeNewspaper
 ) {
  this._id = id;
  this._title = title;
  this._link = link;
  this._image = image;
  this._author = author;
  this._description = description;
  this._content = content;
  this._created_at = created_at;
  this._rss = rss;

  this.typeNewspaper = typeNewspaper;
 }

 get id() {
  if (this._id !== null && this._id !== undefined) return this._id;
  throw new Error("Property `id` is required");
 }

 get title() {
  if (this._title) return this._title;
  throw new Error("Property `title` is required");
 }

 get link() {
  if (this._link) return this._link;
  throw new Error("Property `link` is required");
 }

 get image() {
  if (this._image) return this._image;
  throw new Error("Property `image` is required");
 }

 get author() {
  if (this._author) return this._author;
  throw new Error("Property `author` is required");
 }

 get description() {
  return this._description || "";
 }

 get content() {
  if (this._content) return this._content;
  throw new Error("Property `content` is required");
 }

 get created_at() {
  if (this._created_at) return this._created_at;
  throw new Error("Property `created_at` is required");
 }

 get rss() {
  if (this._rss) return this._rss;
  throw new Error("Property `rss` is required");
 }
}
