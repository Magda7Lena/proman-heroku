import {easyHandler} from "./data_handler.js";

const name = document.getElementById('name');
const note = document.getElementById('note');
const addNewBoardBtn = document.getElementById('add_board');

function getCurrentUser() {
	let current = ''
	if (user.includes('AnonymousUser')) {
		current = 'AnonymousUser'
	} else {
		current = user
	}
	return current

}

const currentUser = getCurrentUser();

class Boards {

	constructor() {
		this.user = currentUser

	}

	init() {
		const path = window.location.pathname;
		if (path === '/') {
			this.loadBoards()
			this.addBoard();
		}
	}

	loadBoards() {
		easyHandler._getData('/api/get-boards', (boards) => this.showBoards(boards))
	}

	showBoards(boards) {
		console.log(this.user)
		console.log(boards)
	}

	addBoard() {
		addNewBoardBtn.addEventListener('click', (event) => {
			event.preventDefault();
			// event.stopPropagation();
			easyHandler.postJson('PUT', '/api/add_board', {
				'name': name.value, 'owner_id': 1, 'note': note.value
			}, (response) => console.log(response))
			if (response === true) {
				alert('Board Added')
			} else {
				alert('Failed')
			}
		})
	}

}


const boards = new Boards()

boards.init()
