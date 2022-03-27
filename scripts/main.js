// design
// mod

var STATE = "MASHINA";
var HIDDEN = false;
var clicked = false;

const copyFunc = (_text) => {
    let inp = document.createElement("input");
    inp.value = _text;
    inp.select();
    document.execCommand("copy", true);
};

const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
};

const HISTORY = [];

const helpString = `
                Ushbu epizod uchun buyruqlar ro'yhati:
                <div class="flex">
                <button class="classic-btn">GO (PLACE)</button>
                <button class="classic-btn">LOOK (SMTH)</button>
                <button class="classic-btn">TOUCH (SMTH)</button>
                <button class="classic-btn">GET OUT</button>
                <button class="classic-btn">EXIT</button>
                </div>`;

const ep1 = {
    msg: `Oy nuri ostida <span class="highlite">MASHINA</span> haydab ketyapsiz. Soat chamasi 01:23 atrofida edi. 
          Yomg'ir yog'ar, yo'l esa juda sirpanchiq edi. Charchoq sababli <span class="highlite">MASHINA</span>ni to'xtatib 
          bir necha soat dam olishni hoxladingiz.
          Oradan biroz vaqt o'tgach, g'alati ovozlar tufayli uyg'onib ketdingiz va yo'lning o'rtasida
          noma'lum <span class="highlite">MAVJUDOT</span>ni payqadingiz. <span class="highlite">MASHINA</span>dan tushdingiz.
          `,
    responses: [
        "YORDAM",
        "GO",
        "GO MASHINA",
        "GO MAVJUDOT",
        "LOOK",
        "LOOK MASHINA",
        "LOOK MAVJUDOT",
        "TOUCH",
        "TOUCH MASHINA",
        "TOUCH MAVJUDOT",
        "GET OUT",
        "EXIT",
    ],
    exec: [
        // help
        () => {
            const obj = {
                ...ep1,
                msg: helpString,
            };
            M.push(obj);
            manipulateLast($("#messages"));
        },
        // GO
        () => {
            const obj = {
                ...ep1,
                msg:
                    "Iltimos, joy nomini kiriting misol: <span class='command'>GO MASHINA</span>",
            };
            M.push(obj);
            manipulateLast($("#messages"));
        },
        // gMashina
        () => {
            const obj = {
                ...ep1,
                msg:
                    STATE === "MASHINA"
                        ? `Siz allaqachon <span class="highlite">MASHINA</span> yonidasiz.`
                        : `Siz <span class="highlite">MASHINA</span> oldiga bordingiz.`,
            };
            M.push(obj);
            manipulateLast($("#messages"));
            STATE = "MASHINA";
        },
        // gMavjudot
        () => {
            const obj = {
                ...ep1,
                msg:
                    STATE === "MAVJUDOT"
                        ? `Siz allaqachon <span class="highlite">MAVJUDOT</span> yonidasiz.`
                        : HIDDEN
                        ? "Menimcha u g'oyib bo'ldi. Bu yerdan tezroq ketish kerak!"
                        : `Siz <span class="highlite">MAVJUDOT</span> yoniga bordingiz. 
                        U o'girilib turar, va uning ko'rinishi sizni juda ham qo'rqitardi...`,
            };
            M.push(obj);
            manipulateLast($("#messages"));
            STATE = "MAVJUDOT";
        },
        // LOOK
        () => {
            const obj = {
                ...ep1,
                msg:
                    "Iltimos, joy nomini kiriting, misol: <span class='command'>LOOK MASHINA</span>",
            };
            M.push(obj);
            manipulateLast($("#messages"));
        },
        // lMashina
        () => {
            const obj = {
                ...ep1,
                msg:
                    STATE === "MASHINA"
                        ? `Siz <span class="highlite">MASHINA</span>ga qaradingiz.`
                        : `<span class="highlite">MASHINA</span> uzoqdan ko'rimsiz edi.
                        OH, <span class="highlite">MAVJUDOT</span> yo'q bo'lib qoldi!
                        Qo'rqib ketdingiz, va <span class="highlite">MASHINA</span> tomonga yugurdingiz...
                        `,
            };
            M.push(obj);
            manipulateLast($("#messages"));
            HIDDEN = true;
            STATE = "MASHINA";
        },
        // lMavjudot
        () => {
            const obj = {
                ...ep1,
                msg:
                    STATE === "MAVJUDOT"
                        ? `Siz <span class="highlite">MAVJUDOT</span>ga qaradingiz. Uning ho'rsillab nafas olishi sizni cho'chitardi...`
                        : HIDDEN
                        ? `Menimcha u go'yib bo'ldi. U yerdan tezroq ketishingiz kerak.`
                        : `Siz <span class="highlite">MAVJUDOT</span>ga qaradingiz. Menimcha unga yordam kerak...`,
            };
            M.push(obj);
            manipulateLast($("#messages"));
        },
        // TOUCH
        () => {
            const obj = {
                ...ep1,
                msg:
                    "Iltimos, joy nomini kiriting, misol: <span class='command'>TOUCH MASHINA</span>",
            };
            M.push(obj);
            manipulateLast($("#messages"));
        },
        // tMashina
        () => {
            const obj = {
                ...ep1,
                msg:
                    STATE === "MASHINA"
                        ? `Siz <span class="highlite">MASHINA</span>ni ushladingiz. Sovuq...`
                        : `<span class="highlite">MASHINA</span> bu yerdan ancha uzoq...
                        `,
            };
            M.push(obj);
            manipulateLast($("#messages"));
        },
        // tMavjudot
        () => {
            const obj = {
                ...ep1,
                msg:
                    STATE === "MAVJUDOT"
                        ? `Qo'rquv...`
                        : HIDDEN
                        ? `Menimcha u go'yib bo'ldi. U yerdan tezroq ketishingiz kerak.`
                        : `<span class="highlite">MAVJUDOT</span> bu yerdan ancha uzoq...`,
            };
            M.push(obj);
            manipulateLast($("#messages"));
        },
        // GET OUT
        () => {
            const obj = {
                ...ep1,
                msg:
                    STATE !== "MASHINA"
                        ? `Avval <span class="highlite">MASHINA</span> yoniga borish kerak...`
                        : `Siz <span class="highlite">MASHINA</span>ni o't oldirib, u yerdan ketdingiz...
                Afsus, sizning hikoyangizga hech kim ishonmaydi..
                <br>`,
            };

            M.push(obj);
            manipulateLast($("#messages"));

            if (STATE === "MASHINA") {
                M.push(M[0]);
                manipulateLast($("#messages"));
            }
        },
        // EXIT
        () => {
            M.push(M[0]);
            manipulateLast($("#messages"));
        },
    ],
};

const M = [
    {
        type: "bot",
        msg: `Hikoyalardan birini tanlang:
            <p class="opt">1: Annabel #Episode_1 (test)</p>
            <p class="opt">2: Blank</p>
            <p class="opt">3: Blank</p>
            <p class="opt">4: Blank</p>
            <p class="opt">5: Yordam</p>
            <p class="opt">6: Haqida</p>
            <p class="opt">7: CLEAR</p>
            `,
        responses: ["1", "2", "3", "4", "5", "6", "7"],
        exec: [
            () => {
                const obj = {
                    type: "bot",
                    ...ep1,
                    error: "Noma'lum buyruq...",
                };
                M.push(obj);
                manipulateLast($("#messages"));
            },
            () => {},
            () => {},
            () => {},
            () => {
                const obj = {
                    ...M[0],
                    msg:
                        "Har bir epizod uchun alohida buyruqlar ro'yhati mavjud. Olish uchun, avval biror epizodni tanlab 'yordam' buyrug'ini bering.",
                };
                M.push(obj);
                manipulateLast($("#messages"));
            },
            () => {
                const obj = {
                    ...M[0],
                    msg: `
                        <p>Dasturlovchi: Humoyun</p>
                        <p>Hikoya: Madaminov Muhammadjon</p>
                        <p style="font-style: italic">Har bir epizod real hayotga asoslangan.</span>
                        `,
                };
                M.push(obj);
                manipulateLast($("#messages"));
            },
            () => {
                $("#messages").innerHTML = "";
                manipulateLast($("#messages"));
            },
        ],
        error: `
        Hikoyalardan birini tanlang:
            <p class="opt">1: Annabel #Episode_1 (test)</p>
            <p class="opt">2: Blank</p>
            <p class="opt">3: Blank</p>
            <p class="opt">4: Blank</p>
            <p class="opt">5: Yordam</p>
            <p class="opt">6: Haqida</p>
            <p class="opt">7: CLEAR</p>
        `,
    },
];

const $ = (_) => document.querySelector(_);

// initial...
manipulateLast($("#messages"));

// manipulates everything...
function manipulate(_parent) {
    M.forEach((_msg) => {
        let el = document.createElement("div");
        if (lastOne.type === "user") {
            el.classList.add("message");
            el.textContent = _msg.msg;
        } else {
            el.classList.add("messageBot");
            el.innerHTML = _msg.msg;
        }
        _parent.appendChild(el);
    });
}

function manipulateLast(_parent) {
    let el = document.createElement("div"),
        lastOne = M[M.length - 1];

    if (lastOne.type === "user") {
        let ann = document.createElement("span");
        el.classList.add("message");
        ann.classList.add("annabel");
        ann.innerHTML = "Annabel&gt;&nbsp;";
        el.appendChild(ann);
        el.textContent += lastOne.msg;
    } else {
        el.classList.add("messageBot");

        // can insert entities...
        el.innerHTML = lastOne.msg;
    }
    _parent.appendChild(el);
}

function addArray(obj, _text, _type) {
    let lastBotResponse = [];

    obj.forEach((_response) => {
        _response.type === "bot" ? lastBotResponse.push(_response) : undefined;
    });

    // recreate variable
    lastBotResponse = lastBotResponse[lastBotResponse.length - 1];

    /* response confirmed */
    M.push({
        msg: _text,
        type: _type,
    });
    manipulateLast($("#messages"));

    /* check the user response */
    if (
        _type == "user" &&
        lastBotResponse.responses.some(
            (_res) => _res.toLowerCase() == _text.toLowerCase().trim()
        )
    ) {
        const index = lastBotResponse.responses.indexOf(
            _text.trim().toUpperCase()
        );
        lastBotResponse.exec[index](_text);
    } else {
        M.push({
            ...lastBotResponse,
            msg: lastBotResponse.error,
        });
        manipulateLast($("#messages"));
    }
}

$M({
    "#user-input": {
        onkeyup: (_e) => {
            if (
                _e.keyCode === 13 &&
                _e.target.value &&
                _e.target.value.length < 40
            ) {
                HISTORY.push(_e.target.value);
                addArray(M, _e.target.value, "user");
                _e.target.value = "";
                scrollToBottom("container");
            }
        },
        adv: {
            ev(target) {
                target.focus();
            },
        },
    },
});

const music = new Audio();
music.src = "../res/bg.mp3";
music.volume = 0.1;

let index = -1;
window.addEventListener("keydown", function (_e) {
    if (!clicked) {
        music.play();
    }
    clicked = true;
    switch (_e.key) {
        case "ArrowUp":
            ++index > HISTORY.length - 1 ? (index = HISTORY.length - 1) : index;
            document.querySelector("#user-input").value = HISTORY[index];
            break;
        case "ArrowDown":
            --index < 0 ? (index = 0) : index;
            document.querySelector("#user-input").value = HISTORY[index];
            break;
    }
});
