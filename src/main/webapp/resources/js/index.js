window.onload = function (){

        var init_data = "단일 텍스트 전송 실험";

    axios({
        method: 'post',
        url: "/init",
        data: 'init_data=' + init_data,
        dataType: 'text'
    })
        .then(function (response){
            console.log("# init success : " + response.data);
            console.log(response);
            document.querySelector("footer p").append(response.data);
        })
        .catch(function (error){
            console.log("# init error : " + error);
        })

}

// 반응형웹 햄버거 버튼 동작

const burger = document.querySelector(".burger");

function navSlide() {
    const navLinks = document.querySelectorAll(".nav-links li");
    const nav = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");

        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("toggle");
    });

}

navSlide();

// index 페이지 기본글
fetch('/resources/lorem80.txt').then(function (data) {

    data.text().then(function (text) {
        document.querySelector(".lorem80").innerText += text;
    })

})


//page 요청
document.querySelector(".corona").onclick = () => {
    axios.get('/resources/corona.json')
        // 응답(성공)
        .then(function (response) {
            document.querySelector(".lorem80").innerText = JSON.stringify(response.data);
        })
        // 응답(실패)
        .catch(function (error) {
            console.log("#### error : " + error);
        })
        // 응답(항상 실행)
        .then(function () {
            // ...
        });

}

/*================================================================
    Login & Register
 ================================================================*/

//login 창 열림
const loginPanel = document.querySelector(".login-panel");

document.querySelector(".btn-open-login").onclick = () => {
    regiPanel.classList.remove("active");
    loginPanel.classList.toggle("active");

    if(burger.classList.contains("toggle")){
        burger.click();
    }
}

//register 창 열림
const regiPanel = document.querySelector(".register-panel");

document.querySelector(".btn-open-register").onclick = () => {
    loginPanel.classList.remove("active");
    regiPanel.classList.toggle("active");

    if(burger.classList.contains("toggle")){
       burger.click();
    }
}

// 창 닫힘 버튼
document.querySelectorAll(".btn-close").forEach(function (item){
    item.onclick = () => {
        loginPanel.classList.remove("active");
        regiPanel.classList.remove("active");
    }
})

// Register
const input = document.querySelectorAll(".register-panel .input-panel input");

document.querySelector(".btn-register").onclick = function (){

    var email = '', nickname = '', pwd = '';

    input.forEach(function (item, index) {

        switch (index){
            case 0: email = item.value; break;
            case 1: nickname = item.value; break;
            case 2: pwd = item.value; break;
        }

    })

    var regi_data = {
        'email': email,
        'nickname': nickname,
        'password': pwd
    }

    axios({
        method: 'post',
        url: "/user/register",
        data: regi_data,
        dataType: 'json'
    })
    .then(function (response){
        console.log(response.data);
        alert("회원가입 성공");

        // input 초기화
        input.forEach(function (item) { item.value = ""; });
        regiPanel.classList.remove("active");

    })
    .catch(function (error){
        console.log(error);
        alert("회원가입 실패");
    })

}





