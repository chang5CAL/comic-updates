export class Comic {
	comic_id: number;
	genre: string;
	language: string;
	author: string;
	description: string;
	first_page: string;
	url: string;
	comic_title: string;
	comic_title_url: string;
	archive_url: string;
	profile_url: string;
	current_chapter: number;
	image: string;
	last_checked: string;

	constructor() {
		this.comic_id = 0;
		this.genre = "";
		this.language = "";
		this.author = "";
		this.description = "";
		this.first_page = "";
		this.url = "";
		this.comic_title = "";
		this.comic_title_url = "";
		this.archive_url = "";
		this.profile_url = "";
		this.current_chapter = 0;
		this.image = "";
		this.last_checked = "";
	}
}