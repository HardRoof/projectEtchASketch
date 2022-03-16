//call initial state of the game
squares(20);

//Creating divs w/ a class inside #container
function squares(numberOfSquares) {
	for (let i = 0; i < Math.pow(numberOfSquares, 2); i++) {
		div = document.createElement('div');
		container.appendChild(div)
		div.classList.add("classDiv")		
	}
};

//importing from html
container = document.getElementById("container");
classDiv = document.querySelectorAll(".classDiv"); //It's array-like(NodeList)

//This function change the color for each div
classDiv.forEach((div, index) => {
  div.addEventListener("mouseover" , function trace(e) {
			classDiv[index].style.backgroundColor = rgbColor()
			if (e.metaKey || e.ctrlKey == true) {
				classDiv[index].style.backgroundColor = "transparent"
			}
  })
})

//importing erase btn from html
let eraseBtn = document.querySelector('#erase')

//Convert nodeList to array. It isn't necessary. Just a reference for the future
let  classDivArr = Array.from(classDiv) 

//Event listener to erase all the color
eraseBtn.addEventListener('click', clear)

function clear() {
	for (let i = 0; i < classDiv.length; i++) {
		classDiv[i].style.backgroundColor = "transparent"
	}
}

// Importing the button and "root"
let resizeBtn = document.querySelector('#resize')
let root = document.documentElement

//Function to resize the board.
resizeBtn.addEventListener('click', rescale)

function rescale() {
	newNumberOfSquares = prompt('Choose between 1 to 100 the number of squares per side for the new grid:')
	root.style.setProperty('--newNumberOfSquaresCss', newNumberOfSquares) //IMPORTANT: it changes the number of squares in css, 20(initial stage). Then reassign it with the number inputted by the user.

	//Removes all children from an element(parent node):
	while (container.firstChild) { 
		container.removeChild(container.firstChild);
	}

	limit(newNumberOfSquares)

	//importing from html and calling addEventListener again
	container = document.getElementById("container");
	classDiv = document.querySelectorAll(".classDiv"); 
	classDiv.forEach((div, index) => {
		div.addEventListener("mouseover" , function trace(e) {
				classDiv[index].style.backgroundColor = rgbColor()
				if (e.metaKey || e.ctrlKey == true) {
					classDiv[index].style.backgroundColor = "transparent"
				}
		})
	})
}

//This function gives an upper and lower limit to the input
function limit(newNumberOfSquares) {
	if ((newNumberOfSquares <= 100) && (newNumberOfSquares > 0)) {
		squares(newNumberOfSquares)
	}
	else {
		root.style.setProperty('--newNumberOfSquaresCss', 20) //css number need to match in order to display the initial code correctly. IF the prompt number is zero, will mess with the layout. This code we insure the css number will return to its original value.
		squares(20) //return the layout to initial stage
		return alert('You have to insert NUMBER between 1 and 100!')
	}
}

//Function of a random color
function rgbColor() {
	let R = Math.floor(Math.random() * 256)
  let G = Math.floor(Math.random() * 256)
	let B = Math.floor(Math.random() * 256)
	return `rgb(${R}, ${G}, ${B})`
}




/*Managed to separate the function from .forEach; Kept it for reference, below is the result. Btw, in event handlers 'this' refers to the html element that received that event.

classDiv.forEach((div) => {
  div.addEventListener("mouseover",trace) 
})

function trace(e) {
	this.style.backgroundColor = "black"
	if (e.metaKey || e.ctrlKey == true) {
		this.style.backgroundColor = "transparent"
	}
}*/