const validateForm = () =>{
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value
    var conform_password = document.getElementById('conform_password').value    


    if(username.trim() === ''){
        alert('Please enter a username or email.')
        return false
    }
    if(email.trim() === ''){
        alert('Please enter a username or email.')
        return false
    }
    if(password.trim() === ''){
        alert('Please enter a password.')
    }
    // if(conform_password.trim() === ''){
    //     alert('Please enter a password.')
    // }
    if(password !== conform_password){
        alert('Password does not match. ')
        return false
    }
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    alert('Form submitted successfully');

    return true


}



