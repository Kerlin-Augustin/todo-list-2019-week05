
function clearList(){
  document.querySelectorAll('li').forEach(li => {
    li.remove()
  })

}

document.querySelector('.clearList').addEventListener('click', clearList)

let trash = document.querySelectorAll('.delete')
trash.forEach(function(element) {
  element.addEventListener('click', function(){
    const shoe = this.parentNode.childNodes[1].innerText
    fetch('shoe', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'shoe': shoe,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

let crossout = document.querySelectorAll('.crossout')
crossout.forEach(function(element) {
  element.addEventListener('click', function(){
    let shoe = this.parentNode.childNodes[1].innerText
    // shoe.classList.toggle('strike')
    let background = this.parentNode
    fetch('crossout', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'shoe': shoe,
        'crossout': true,
      })
    }).then(function (response) {
      if(response.ok){
        return response.json()
      }
      window.location.reload()
    })
    .then(data => {
      background.style.textDecoration = 'line-through'
    })
  });
});




//Press "add to list" to make that value appear on a list
//When pressing on a item in the list toggle a line through the text
//Make a text appear stating how much items are in the to do list
//When "clear list" is pressed, erase everything on the list
//When "Clear completed" is pressed, erase everything that has a line through it

