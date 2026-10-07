/* =========================
   PROJECT BUTTONS
========================= */

function showProject(projectName) {

    const details = {

        "Library Management System":
            "Java project for adding, searching, issuing books and calculating overdue fines.",

        "Student Information Management":
            "Java project demonstrating classes, constructors, encapsulation and student categories.",

        "Python Applications":
            "Collection of Python applications covering classes, dictionaries, hash tables and algorithms.",

        "Personal Portfolio":
            "Responsive portfolio created with HTML, CSS and JavaScript.",

        "AI and Machine Learning Projects":
            "Academic ML work involving classification, regression, clustering and model evaluation.",

        "Git Remote Demo":
            "Git practice involving repositories, branches, feature work and merging."

    };


    alert(
        projectName +
        "\n\n" +
        details[projectName]
    );
}



/* =========================
   SIGN UP
========================= */

const signupForm =
    document.getElementById("signupForm");

const signupMessage =
    document.getElementById("signupMessage");


signupForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "signupName"
            ).value.trim();


        const email =
            document.getElementById(
                "signupEmail"
            ).value.trim();


        const username =
            document.getElementById(
                "signupUsername"
            ).value.trim();


        const password =
            document.getElementById(
                "signupPassword"
            ).value;


        const confirmPassword =
            document.getElementById(
                "signupConfirmPassword"
            ).value;


        /* CHECK PASSWORD */

        if (password !== confirmPassword) {

            showMessage(
                signupMessage,
                "Passwords do not match.",
                "error"
            );

            return;
        }


        /* GET EXISTING USERS */

        let users =
            JSON.parse(
                localStorage.getItem(
                    "nellyPortfolioUsers"
                )
            ) || [];


        /* CHECK USERNAME */

        if (
            users.some(
                user =>
                    user.username.toLowerCase() ===
                    username.toLowerCase()
            )
        ) {

            showMessage(
                signupMessage,
                "Username already exists.",
                "error"
            );

            return;
        }


        /* CHECK EMAIL */

        if (
            users.some(
                user =>
                    user.email.toLowerCase() ===
                    email.toLowerCase()
            )
        ) {

            showMessage(
                signupMessage,
                "Email is already registered.",
                "error"
            );

            return;
        }


        /* SAVE USER */

        users.push({

            name: name,

            email: email,

            username: username,

            password: password

        });


        localStorage.setItem(
            "nellyPortfolioUsers",
            JSON.stringify(users)
        );


        showMessage(
            signupMessage,
            "Registration successful! You can now login.",
            "success"
        );


        signupForm.reset();

    }
);



/* =========================
   LOGIN
========================= */

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const username =
            document.getElementById(
                "loginUsername"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        const users =
            JSON.parse(
                localStorage.getItem(
                    "nellyPortfolioUsers"
                )
            ) || [];


        const user =
            users.find(

                item =>
                    item.username === username &&
                    item.password === password

            );


        /* INVALID LOGIN */

        if (!user) {

            showMessage(
                loginMessage,
                "Invalid username or password.",
                "error"
            );

            return;
        }


        /* SAVE LOGIN */

        localStorage.setItem(
            "nellyLoggedIn",
            "true"
        );


        localStorage.setItem(
            "nellyCurrentUser",
            user.username
        );


        showMessage(
            loginMessage,
            "Login successful!",
            "success"
        );


        showUserProfile(user);


        loginForm.reset();

    }
);



/* =========================
   USER PROFILE
========================= */

const userProfile =
    document.getElementById(
        "userProfile"
    );


const welcomeUser =
    document.getElementById(
        "welcomeUser"
    );


const profileUsername =
    document.getElementById(
        "profileUsername"
    );


const profileEmail =
    document.getElementById(
        "profileEmail"
    );


const authContainer =
    document.getElementById(
        "authContainer"
    );


function showUserProfile(user) {

    authContainer.style.display =
        "none";


    userProfile.style.display =
        "block";


    welcomeUser.textContent =
        "Welcome, " + user.name + "!";


    profileUsername.textContent =
        user.username;


    profileEmail.textContent =
        user.email;

}



/* =========================
   LOGOUT
========================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "nellyLoggedIn"
            );


            localStorage.removeItem(
                "nellyCurrentUser"
            );


            userProfile.style.display =
                "none";


            authContainer.style.display =
                "grid";


            showMessage(
                loginMessage,
                "You have been logged out.",
                "success"
            );

        }
    );



/* =========================
   RESTORE LOGIN
========================= */

window.addEventListener(
    "load",
    function() {

        const loggedIn =
            localStorage.getItem(
                "nellyLoggedIn"
            );


        const currentUsername =
            localStorage.getItem(
                "nellyCurrentUser"
            );


        if (
            loggedIn === "true" &&
            currentUsername
        ) {

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "nellyPortfolioUsers"
                    )
                ) || [];


            const user =
                users.find(
                    item =>
                        item.username ===
                        currentUsername
                );


            if (user) {

                showUserProfile(user);

            }

        }

    }
);



/* =========================
   CONTACT FORM
========================= */

document
    .getElementById("contactForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            alert(
                "Thank you, " +
                name +
                "!\n\nYour message has been received."
            );


            this.reset();

        }
    );



/* =========================
   MESSAGE FUNCTION
========================= */

function showMessage(
    element,
    message,
    type
) {

    element.textContent =
        message;


    if (type === "success") {

        element.style.color =
            "green";

    } else {

        element.style.color =
            "red";

    }

}