const validateForm = () =>{
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value
    var conform_password = document.getElementById('conform_password').value    


    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || conform_password.trim() === '') {
        alert('Please fill in all fields.');
        return false;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }
    if(password !== conform_password){
        alert('Password does not match. ')
        return false
    }else{
    alert('Form submitted successfully');
}


    const user = {
        Username: username,
        Email: email,
        Password: password,
        Conform_password: conform_password
    }
    const url = "https://shopping-cart-912ad-default-rtdb.firebaseio.com/signup.json"

    
    fetch(url,{method: 'POST' , headers: {
        'Content-type' : 'application/json'
    },
    body: JSON.stringify(user)
})

.then(Response => Response.json())
.then(data => console.log('Success: ', data))
.catch(error => console.log('Error:', error))

return true


}

document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.querySelector('form')

    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault()

        if(validateForm()){
            signUpForm.reset()
        }
    })
})


