const form = document.forms["form"]; 
const formArr = Array.from(form);
const validFormArr = []; 
const button = form.elements["button"]; 

formArr.forEach((el) => {
    if (el.hasAttribute("data-reg")) {
      el.setAttribute("is-valid", "0");
      validFormArr.push(el);
    }
  });
  
  form.addEventListener("input", inputHandler);
  button.addEventListener("click", buttonHandler);

  function inputHandler({ target }) {
    if (target.hasAttribute("data-reg")) {
      inputCheck(target);
    }
  }

function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg);
    if (reg.test(inputValue)) {
        el.setAttribute("is-valid", "1");
        el.classList.remove("input__error");
        if (el.getAttribute("id") === "phone-number") {
            document.querySelector(".form__descr_mob").classList.remove("form__descr_error");
        } else if (el.getAttribute("id") === "email") {
            document.querySelector(".form__descr_email").classList.remove("form__descr_error");
        }
    } else {
        el.setAttribute("is-valid", "0");
        el.classList.add("input__error");
        if (el.getAttribute("id") === "phone-number") {
            document.querySelector(".form__descr_mob").classList.add("form__descr_error");
        } else if (el.getAttribute("id") === "email") {
            document.querySelector(".form__descr_email").classList.add("form__descr_error");
        }
    }
}


  function buttonHandler(e) {
    const allValid = [];
    validFormArr.forEach((el) => {
      allValid.push(el.getAttribute("is-valid"));
    });
    const isAllValid = allValid.reduce((acc, current) => {
      return acc && current;
    });
  
    if (!Boolean(Number(isAllValid))) {
      e.preventDefault();
    }
  }