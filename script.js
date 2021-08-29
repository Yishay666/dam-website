var firebaseConfig = {
    apiKey: "AIzaSyB9MDU7m-NjfLpBQ6C3stzz0qSqB8YIQ0A",
    authDomain: "dam-website4u-7ecb4.firebaseapp.com",
    databaseURL: "https://dam-website4u-7ecb4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dam-website4u-7ecb4",
    storageBucket: "dam-website4u-7ecb4.appspot.com",
    messagingSenderId: "844225170436",
    appId: "1:844225170436:web:0061fae3bb927268ae7951"
};
firebase.initializeApp(firebaseConfig);


var forms = firebase.database().ref('msgs')
document.getElementById('contact-us').addEventListener('click', submitForm);
var phoneNumber;
var msg;
var canSend = false;
var errorMsg = 'בעיה לא צפויה קרתה, בדוק שהכל תקין';

function submitForm(e){
    if(canSend)
    {
        saveForm()
        document.getElementById('phoneNumber').value = '';
        document.getElementById('msg').value = '';

        document.getElementById('success').style.display ='block';
        setTimeout(() => {
            document.getElementById('success').style.display = 'none';
        }, 3000)
    } else {
        document.getElementById('error').innerHTML = errorMsg;
    }
}
function checkForm(){
    document.getElementById('error').innerHTML = '';
    phoneNumber = document.getElementById('phoneNumber').value;
    msg = document.getElementById('msg').value;

    canSend = true;
    
    if((phoneNumber.length == 9 || phoneNumber.length == 10) && phoneNumber[0] == '0')
    {
        if(errorMsg == 'מספר טלפון לא תקין') errorMsg = ''
    } else {
        canSend = false;
        errorMsg = 'מספר טלפון לא תקין'
    }

    if(msg.length > 20) {
        if(errorMsg =='לפחות 20 תווים') errorMsg = ''
    } else {
        canSend = false;
        if(errorMsg.length == 0) errorMsg = 'לפחות 20 תווים';
    }
}

function getDate(){
    var d = new Date();
    var t = [d.getDate(), d.getMonth()+1, d.getFullYear(), d.getHours(), d.getMinutes()];

    t = t.map(time => {
        return time < 10 ? `0${time}` : time;
    })

    return [`${t[0]}/${t[1]}/${t[2]}`, `${t[3]}:${t[4]}`];
}
function saveForm(){
    var time = getDate();
    var newForm = forms.push();
    newForm.set({
        phoneNumber: phoneNumber,
        msg: msg,
        time: time
    })
}

