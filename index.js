// Get references to DOM elements
const itemInput = document.getElementById('item-input')
const addItemButton = document.getElementById('add-item-button')
const shoppingList = document.getElementById('shopping-list')

// Use LocalStorage to hold the value 
let listArr = JSON.parse(localStorage.getItem('shoppingList')) || []

// Function to update localStorage with the current list
function updateLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(listArr))
}

// Function to check for duplicates and add items
function checkDuplicate() {
    let itemText = itemInput.value.trim()

    // Ignore empty input
    if (itemText === "") {
        return
    }

    const normalizedText = itemText.toLowerCase()
    const normalizedListArr = listArr.map(item => item.toLowerCase())

    // If no duplicate, add item to the list
    if (!normalizedListArr.includes(normalizedText)) {
        listArr.unshift(itemText)
        updateLocalStorage()
        renderList()
    }
}

// Function to render the list
function renderList() {
    shoppingList.innerHTML = ''
    
    listArr.forEach((gift, index) => {
        let listItem = document.createElement('li')
        listItem.textContent = gift
        shoppingList.appendChild(listItem)

        // Create and add the delete button
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'delete'
        deleteBtn.classList.add('delete')
        listItem.append(deleteBtn)

        // Add event listener to the delete button
        deleteBtn.addEventListener('click', function () {
            // Remove the item from the array
            listArr.splice(index, 1)
            updateLocalStorage() // Update localStorage
            renderList() // Re-render the list
        })
    })

    itemInput.value = '' // Clear the input field after adding an item
}

// Add event listener to Add button
addItemButton.addEventListener('click', checkDuplicate)

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate()
    }
})

// Initial render from localStorage
renderList()
