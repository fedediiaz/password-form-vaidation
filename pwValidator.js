(function () {
    // GLobals
    const form = document.querySelector("#registration-form");
    const passwordFields = document.querySelectorAll("input[type='password']");

    function checkPasswordValidations(word) {
        /* Input  => String
           Output => Object 
        */

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

        return {
            uppercase: pattern.uppercase.test(word),
            lowercase: pattern.lowercase.test(word),
            number: pattern.number.test(word),
            symbol: pattern.symbol.test(word),
            length: pattern.length(word),
        };
    }

    function isValidPassword(objPassword) {
        /* Input  => Object
           Output => bool
        */
        const validationsArray = Object.values(objPassword);

        return validationsArray.every((bool) => {
            return bool;
        });
    }

    function isWordMatch(string1, string2) {
        /* Input  => string, string
           Output => bool 
        */
        return string1 === string2;
    }

    function validateHTML(obj) {
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

    function toggleBetweenClass(target, removeClass, addClass) {
        target.remove(removeClass);
        target.add(addClass);
    }

    form.addEventListener("keyup", (e) => {
        const password = form.password.value;
        const passwordConfirm = form.confirmPassword.value;
        const submitButton = document.querySelector("button[type='submit']");
        const targetClass = e.target.classList;

        // Validate patterns for a valid password
        const passwordChecker = checkPasswordValidations(password);
        // Check if every pattern match
        const isValidPW = isValidPassword(passwordChecker);
        // Check if both passwords match
        const passwordsMatch = isWordMatch(passwordConfirm, password);

        validateHTML(passwordChecker);

        // Update submit button ONLY when conditions met
        if (isValidPW && passwordsMatch && submitButton.disabled) {
            submitButton.disabled = false;
        } else if (!submitButton.disabled && !passwordsMatch) {
            submitButton.disabled = true;
        }

        switch (e.target.id) {
            case "password":
                if (password.length === 0) {
                    e.target.className = `${targetClass[0]} ${targetClass[1]}`;
                } else if (
                    isValidPassword(checkPasswordValidations(password))
                ) {
                    targetClass.add("is-success");
                    targetClass.remove("is-error");
                } else {
                    targetClass.add("is-error");
                    targetClass.remove("is-success");
                }
                break;
            case "confirmPassword":
                if (passwordConfirm.length === 0) {
                    e.target.className = `${targetClass[0]} ${targetClass[1]}`;
                } else if (
                    isValidPassword(
                        checkPasswordValidations(passwordConfirm)
                    ) &&
                    passwordsMatch
                ) {
                    targetClass.add("is-success");
                    targetClass.remove("is-error");
                } else {
                    targetClass.add("is-error");
                    targetClass.remove("is-success");
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
})();
