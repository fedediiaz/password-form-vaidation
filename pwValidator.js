(function () {
    // GLobals
    const form = document.querySelector("#registration-form");
    const passwordFields = document.querySelectorAll("input[type='password']");
    const passwordToggler = document.querySelectorAll(".toggleView");

    function checkPasswordValidations(word) {
        /* Input  => String
           Output => Object 
        */

        // Validations to be made over the string. 
        const pattern = {
            uppercase: /[A-Z]/,
            lowercase: /[a-z]/,
            number: /[0-9]/,
            symbol: /[!@#$%^&*]/,
            length: (param) => {
                return (
                    param.length >= 8 &&
                    param.length <= 20 &&
                    !param.includes(" ")
                );
            },
        };

        
        // Must be a better way to do the bellow code
        return {
            uppercase: pattern.uppercase.test(word),
            lowercase: pattern.lowercase.test(word),
            number: pattern.number.test(word),
            symbol: pattern.symbol.test(word),
            length: pattern.length(word),
        };
    }

    function isValidPassword(objPassword) {
        /* Input  => Object from checkPasswordValidations
           Output => bool
        */
        const validationsArray = Object.values(objPassword);

        return validationsArray.every((bool) => {
            return bool;
        });
    }

    function UpdatePassValidationsFields(obj) {
        /* Input  => Object from checkPasswordValidations
           Output => none;
           Desc   => Modifies HTML
        */

        for (key in obj) {
            let element = document.querySelector(`#error-${key}`);

            if (obj[key]) {
                element.className = "text-success";
            } else {
                element.className = "text-danger";
            }
        }
    }

    function isWordMatch(string1, string2) {
        /* Input  => string, string
           Output => bool 
        */
        return string1 === string2;
    }

    function toggleClasses(target, removeClass, addClass) {
        const targetClass = target.classList;

        targetClass.add(addClass);
        targetClass.remove(removeClass);
    }

    form.addEventListener("keyup", (e) => {
        const password = form.password.value;
        const passwordConfirm = form.confirmPassword.value;
        const submitButton = document.querySelector("button[type='submit']");
        const target = e.target

        // Validate patterns for a valid password
        const passwordChecker = checkPasswordValidations(password);
        // Check if every pattern match, only then is a valid password.
        const isValidPW = isValidPassword(passwordChecker);
        // Check if both passwords and ConfirmPassword match
        const passwordsMatch = isWordMatch(passwordConfirm, password);

        // Updates HTML with corresponding errors
        UpdatePassValidationsFields(passwordChecker);

        // Enable submit button ONLY when conditions met
        if (isValidPW && passwordsMatch && submitButton.disabled) {
            submitButton.disabled = false;
        } else if (!submitButton.disabled && !passwordsMatch) {
            submitButton.disabled = true;
        }


        // Toggle Classes
        switch (target.id) {
            case "password":
                if (password.length === 0) {
                    target.className = `${target.classList[0]}`;
                } else if (
                    isValidPassword(
                        checkPasswordValidations(password)
                        )
                ) {
                    toggleClasses(target, "is-error", "is-success");
                } else {
                    toggleClasses(target, "is-success", "is-error");
                }
                break;
            case "confirmPassword":
                if (passwordConfirm.length === 0) {
                    target.className = `${target.classList[0]}`;
                } else if (
                    isValidPassword(
                        checkPasswordValidations(passwordConfirm)
                    ) &&
                    passwordsMatch
                ) {
                    toggleClasses(target, "is-error", "is-success")
                } else {
                    toggleClasses(target, "is-success", "is-error");
                }
                break;
        }

    });

    passwordFields.forEach((field) => {
        let errors = document.querySelector(".display-errors");

        field.addEventListener("focus", () => {
            errors.style.visibility = "visible";
        });

        field.addEventListener("blur", () => {
            errors.style.visibility = "hidden";
        });

    });

    passwordToggler.forEach(elem => {
        
        elem.addEventListener("click", e => {

        const target = e.target;
        const curInputField = target.parentElement.previousElementSibling;
        const hasHiddenClass = target.classList.contains("hidden");
        const targetSibling = target.previousElementSibling || target.nextElementSibling;

        if (!hasHiddenClass) {
            targetSibling.classList.toggle("hidden");
            target.classList.toggle("hidden");

            switch(curInputField.type) {
                case "text":
                    curInputField.type = "password";
                    break;
                case "password":
                    curInputField.type = "text";
                    break;
            }
        }
        });
    })
}());
