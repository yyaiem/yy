vEr = "v 3.0.2";


const noTificationData = "https://script.google.com/macros/s/AKfycbx9Z8rpXcwGSmFW8CbmSU66SNBwS8MtfhIuKM6wlPAqA2417HN8BVIL-rvcbTHeNOqZ/exec";

async function fetchNotifData() {
    try {
        const response = await fetch(noTificationData);
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${ response.status } ');
        }

        const data = await response.text(); // Assuming the Apps Script returns JSON
        if (data) {
            let arrb = stringToArray(data)
            notiFications(arrb)
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        // notiFications([["Error fetching Notifications - Reload", "", "1"]])
    }
}

function stringToArray(str) {
    return JSON.parse(str); // Convert JSON string back to an array
}

function notiFications(data) {
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let notificationBox = document.createElement("div")
        document.getElementById("notificationArea").appendChild(notificationBox)
        notificationBox.className = "alert"

        const close_btn = document.createElement("span")
        notificationBox.appendChild(close_btn)
        close_btn.className = "closebtn"
        close_btn.innerHTML = ("&times")
        close_btn.onclick = function (param) {
            close_btn.parentElement.style.display = "none"
        }

        let msgTText = document.createElement("strong")
        notificationBox.appendChild(msgTText)
        msgTText.textContent = element[0]
        // msgTText.className = ""

        if (element[1]) {
            let btn = document.createElement("a")
            msgTText.appendChild(btn)
            btn.textContent = "Open Details"
            btn.className = "notificatioon_link"
            btn.href = element[1];
            btn.target = "_blank"
        }

        if (!element[2]) {
            notificationBox.style.backgroundColor = "rgb(255, 0, 0)"
        } else if (element[2] == 1) {
            notificationBox.style.backgroundColor = "rgb(255, 0, 0)"
        } else if (element[2] == 2) {
            notificationBox.style.backgroundColor = "rgb(201, 173, 16)"
        } else if (element[2] == 3) {
            notificationBox.style.backgroundColor = "rgb(0, 219, 80)"
        } else {
            notificationBox.style.backgroundColor = "rgb(0, 140, 226)"
        }
    }
}

const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbw__R_BDgzpCiYG-VYk7S56nmD0T7ua5HB1G_b2OfsGM3BJFiSiUeoUOny7CjeVfGYcaA/exec';

async function fetchData() {
    try {
        const response = await fetch(googleAppsScriptURL);
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${ response.status } ');
        }

        const data = await response.json(); // Assuming the Apps Script returns JSON
        localStorage.setItem("NumbersOfMembers", JSON.stringify(data, null, 2))

        document.getElementById('grp_mem_count').innerText = localStorage.getItem("NumbersOfMembers") + " Community Members";
        // console.log(JSON.stringify(data, null, 2))
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('grp_mem_count').innerText = 'Error loading data.';
        notiFications([["Error loading data. - Check your internet or Reload Page", "", "1"]])
    }
}

function updateMembersCount() {

    if (!localStorage.getItem("NumbersOfMembers")) {
        document.getElementById('grp_mem_count').innerText = "Calculating Community Members..."

    }
    else {

        document.getElementById('grp_mem_count').innerText = localStorage.getItem("NumbersOfMembers") + " Community Members";
    }
}

function loadEvents(eveDataArr, state = "") {
    if (eveDataArr.length > 0) {
        document.getElementById("Loading_Screen").style.display = "none"
    } else if (eveDataArr.length == 0 && state == "u") {
        // document.getElementById("Loading_Screen").style.display = "block"
        document.getElementById("noMsgtext").innerText = "There are curently no upcomeing events. Please check again soon"
        return;
    }
    for (let index = 0; index < eveDataArr.length; index++) {
        const eveData = eveDataArr[index];

        const eventCoontainer = document.createElement("div")
        eventCoontainer.className = "event_section";
        document.getElementById("main").appendChild(eventCoontainer)

        const eventContent = document.createElement("div")
        eventContent.className = "event"
        eventCoontainer.appendChild(eventContent)

        const eventBanner = document.createElement("img")
        eventBanner.className = "event_banner"
        eventBanner.src = `https://raw.githubusercontent.com/yyaiem/poster/refs/heads/main/${eveData[2]}`
        eventContent.appendChild(eventBanner)

        const eventTexts = document.createElement("div")
        eventTexts.className = "event_text"
        eventContent.appendChild(eventTexts);

        let blankDiv = document.createElement("div")
        eventTexts.appendChild(blankDiv)

        const eventName = document.createElement("h1")
        eventName.innerText = eveData[0]
        eventName.className = "event_name"
        blankDiv.appendChild(eventName)

        const event_description = document.createElement("p")
        event_description.className = "event_description"
        event_description.innerText = eveData[1]
        eventTexts.appendChild(event_description)

        const ButtonConainer = document.createElement("div")
        ButtonConainer.className = "btn_container"
        eventTexts.appendChild(ButtonConainer)

        const PostDate = document.createElement("p")
        ButtonConainer.appendChild(PostDate)
        PostDate.innerText = eveData[3]
        PostDate.className = "event_date"

        if (eveData[4]) {
            const ButOn = document.createElement("p")
            ButtonConainer.appendChild(ButOn)
            ButOn.innerText = eveData[4]
            ButOn.className = "reg_btn"
            if (eveData[5]) {
                ButOn.style.cursor = "pointer"
                ButOn.onclick = function () {
                    window.open(eveData[5], '_blank')
                }
            }
            else {
                ButOn.style.cursor = "none"

            }
        }
    }
}

let EventDataAPI = "https://script.google.com/macros/s/AKfycbyzC1XbpUXeedcNMUa0tORdn8-Kio_p75V0EpdCwxn1KVJXSnjAvMguAon6KbCzYg3J/exec"

async function FetchEventData(evt) {
    try {
        const response = await fetch(EventDataAPI);
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${ response.status } ');
        }

        const data = await response.text(); // Assuming the Apps Script returns JSON
        if (data) {
            let arrb = stringToArray(data)
            SortEvent(arrb, evt);

        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function FetchEventDataSafe() {
    try {
        const response = await fetch(EventDataAPI);
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${ response.status } ');
        }

        const data = await response.text(); // Assuming the Apps Script returns JSON
        if (data) {
            let arrb = stringToArray(data)
            SortEvent(arrb);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function eventValidation(userDate, userTime) {

    // Parse user-entered date and time
    const [day, month, year] = userDate.split('/').map(Number);
    const userDateTime = new Date(`${year}-${month}-${day} ${userTime}`);

    // Get the current date and time in "Asia/Kolkata" timezone
    const now = new Date();
    const currentKolkataDateTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    );

    // Compare the two Date objects
    if (userDateTime > currentKolkataDateTime) {
        return "Future"; // User-entered date and time is in the future
    } else if (userDateTime < currentKolkataDateTime) {
        return "Past"; // User-entered date and time is in the past
    } else {
        return "Present"; // User-entered date and time is equal to the current date and time
    }
}

async function SortEvent(dataArray, evt = "") {

    const up = []; // For future entries
    const past = []; // For past entries

    for (let index = 0; index < dataArray.length; index++) {

        const element = dataArray[index];
        // console.log(element)
        let event_state = eventValidation(element[5], element[6])
        if (event_state == "Future") {
            up.push(element.slice(0, 4).concat(element.slice(7)));
        }
        else if (event_state == "Past") {
            past.push(element.slice(0, 4).concat(element.slice(7)));
        }
        else {
            console.log("Pursing...")
        }
    }

    localStorage.setItem("UpComeingEvents", JSON.stringify(up))
    localStorage.setItem("PastEvents", JSON.stringify(past))

    if (evt == 'p') {
        loadEvents(past)
    } else if (evt == 'u') {
        loadEvents(up, "u")
    }
    // return { up, past };
}

async function CheckInterNet() {

    while (true) {
        try {
            await fetch("https://www.github.com", { mode: 'no-cors' })  // A simple Google URL
                .then(response => {
                    // console.log("You are online.");
                });

            // Wait for 3 seconds
            await new Promise(resolve => setTimeout(resolve, 3000));
        } catch (error) {
            console.error("Error occurred:", error.message);
            console.log("Breaking the loop due to an error.");
            notiFications([["You are currently offline. Kindly verify your internet connection and refresh the page to continue.", "", "1"]]);
            break; // Exit the loop when an error occurs
        }
    }
}
const OrganizerAPI = "https://script.google.com/macros/s/AKfycbyvEDbxUNlKJlEG9QPmvsaYqI-8SCd-4ygxJLsC8ZkVO9TJFVHTxu6zzbnmb1KqfS8J/exec"

const mentorAPI = "https://script.google.com/macros/s/AKfycbyJFuCcw1BrRpeAXZ40_62YhLZw7AVfN6vnUAh2hUJJ28sZ6yJeqfWKvoDatX49UPi_/exec"

async function FetchData(API_URL,parameter = "") {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${ response.status } ');
        }

        const data = await response.text(); // Assuming the Apps Script returns JSON
        if (data) {
            let arrb = stringToArray(data)
            // console.log(arrb);
            loadOrganizrs(arrb,parameter);
            // return arrb;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function loadOrganizrs(arr,parameter = "") {

    document.getElementById("Loading_Screen").style.display = "none"
    const CaRd = document.createElement("div")
    CaRd.className = "s1"
    document.getElementById(parameter).appendChild(CaRd)

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];

        const concard = document.createElement("div")
        concard.className = "s4"
        CaRd.appendChild(concard)

        const cardurl = document.createElement("div")
        // cardurl.target = "_blank"
        if(element[4]){

            cardurl.onclick=function () {
                window.open(element[4],"_blank")
            }
        }
        cardurl.rel = "noopener noreferrer"
        concard.appendChild(cardurl)

        const dpsiv = document.createElement("div")
        dpsiv.className = "s2"
        cardurl.appendChild(dpsiv)

        const dp = document.createElement("img")
        dp.className = "dp"
        dp.alt = element[0]
        dp.src = `https://raw.githubusercontent.com/yyaiem/yy_members/refs/heads/main/${element[3]}`
        dpsiv.appendChild(dp)

        const namediv = document.createElement("div")
        namediv.className = "s3"
        cardurl.appendChild(namediv)

        const nametxt = document.createElement("h1")
        nametxt.className = "name"
        nametxt.innerText = element[0]
        namediv.appendChild(nametxt)

        const rolediv = document.createElement("div")
        rolediv.className = "s3"
        cardurl.appendChild(rolediv)

        const roletxt = document.createElement("p")
        roletxt.className = "pos"
        roletxt.innerText = element[1]
        rolediv.appendChild(roletxt)

        if (element[2]) {
            const roledivb = document.createElement("div")
            roledivb.className = "s3"
            cardurl.appendChild(roledivb)

            const rolebtxt = document.createElement("p")
            rolebtxt.className = "pos"
            rolebtxt.innerText = element[2]
            roledivb.appendChild(rolebtxt)
        }


    }
}

// async function getCurrentYearFromInternet() {
//     try {
//         // Fetch time data for the Indian timezone
//         const response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
        
//         if (!response.ok) {
//             throw new Error("Failed to fetch the time");
//         }

//         const data = await response.json();

//         // Extract and parse the current year from the datetime string
//         const dateTime = new Date(data.datetime);
//         const currentYear = dateTime.getFullYear();

//         // console.log("Current Year in India:", currentYear);
//         document.getElementById("year").innerText = currentYear;
//         return currentYear;
//     } catch (error) {
//         console.error("Error fetching the current year:", error);
//         return null;
//     }
// }

// // Call the function
// getCurrentYearFromInternet();
// Get the current date in India
const indiaDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

// Create a Date object based on the Indian timezone
const indiaYear = new Date(indiaDate).getFullYear();
document.getElementById("year").innerText = indiaYear;
CheckInterNet();

document.getElementById("version").innerText = vEr
