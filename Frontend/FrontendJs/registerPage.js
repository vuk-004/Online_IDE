
function validateForm() {
  var name = document.getElementById('name').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var cpassword = document.getElementById('cpassword').value

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    if(!name || !email || !password || !cpassword){
      alert("Please enter all fields")
      return false
    }
    if(name.length<5){
      alert("Name cannot be less than 5 characters")
      return false
    }
    if(!(emailRegex.test(email))){
      alert("Email is not in the right format")
      return false
    }
    if (password != cpassword) {
      alert('Password and Confirm Password do not match.')
      return false
    }
    return true

}

const regBtn = document.getElementById('Register')

regBtn.addEventListener('click',async (e)=>{
  e.preventDefault()
  if(validateForm()){
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const body = JSON.stringify({name , email , password})

  try{
    const resp =  await axios({
      method : "POST",
      url : "http://localhost:7956/signup",
      headers : {
        'Access-Control-Allow-Origin': '*',
        'Content-Type' : 'application/json'
      },
      data : body
    })
    if(resp.data.status == 200){
      alert(resp.data.msg)
      window.location.replace("http://localhost:7956")
    }
    else if(resp.data.status == 422){
      alert(resp.data.msg)
    }
    else{
      alert("Unexpected error")
    }
  }
  catch(err){
    alert(err)
  }
}
})
