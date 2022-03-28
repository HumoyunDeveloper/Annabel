const epz1 = {
    msg: `Oy nuri ostida <span class="highlite">MASHINA</span> haydab ketyapsiz. Soat chamasi 01:23 atrofida edi. 
          Yomg'ir yog'ar, yo'l esa juda sirpanchiq edi. Charchoq sababli <span class="highlite">MASHINA</span>ni to'xtatib 
          bir necha soat dam olishni hoxladingiz.
          Oradan biroz vaqt o'tgach, g'alati ovozlar tufayli uyg'onib ketdingiz va yo'lning o'rtasida
          noma'lum <span class="highlite">MAVJUDOT</span>ni payqadingiz. <span class="highlite">MASHINA</span>dan tushdingiz <span style="font-style: italic">("yordam" buyrug'i orqali yordam oling)</span>
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
    generate() {
        let text = "Ushbu epizod uchun barcha buyruqlar ro'yhati:";
        this.responses.forEach((_) => {
            text += "<p class='auto opt2'>[" + _ + "]</p>";
        });
        return text;
    },
    exec: [
        // help
        () => {
            const obj = {
                ...epz1,
                msg: epz1.generate(),
            };

            GAME.addAndUpdate(obj);
            init();
        },
        // GO
        () => {
            const obj = {
                ...epz1,
                msg: "Iltimos, joy nomini kiriting misol: <span class='command'>GO MASHINA</span>",
            };

            GAME.addAndUpdate(obj);
        },
        // gMashina
        () => {
            const obj = {
                ...epz1,
                msg:
                    GAME.STATE === "MASHINA"
                        ? `Siz allaqachon <span class="highlite">MASHINA</span> yonidasiz.`
                        : `Siz <span class="highlite">MASHINA</span> oldiga bordingiz.`,
            };

            GAME.addAndUpdate(obj);
            GAME.STATE = "MASHINA";
        },
        // gMavjudot
        () => {
            const obj = {
                ...epz1,
                msg:
                    GAME.STATE === "MAVJUDOT"
                        ? `Siz allaqachon <span class="highlite">MAVJUDOT</span> yonidasiz.`
                        : GAME.HIDDEN
                        ? "Menimcha u g'oyib bo'ldi. Bu yerdan tezroq ketish kerak!"
                        : `Siz <span class="highlite">MAVJUDOT</span> yoniga bordingiz. 
                        U o'girilib turar, va uning ko'rinishi sizni juda ham qo'rqitardi...`,
            };

            GAME.addAndUpdate(obj);
            GAME.STATE = "MAVJUDOT";
        },
        // LOOK
        () => {
            const obj = {
                ...epz1,
                msg: "Iltimos, joy nomini kiriting, misol: <span class='command'>LOOK MASHINA</span>",
            };

            GAME.addAndUpdate(obj);
        },
        // lMashina
        () => {
            const obj = {
                ...epz1,
                msg:
                    GAME.STATE === "MASHINA"
                        ? `Siz <span class="highlite">MASHINA</span>ga qaradingiz.`
                        : `<span class="highlite">MASHINA</span> uzoqdan ko'rimsiz edi.
                        OH, <span class="highlite">MAVJUDOT</span> yo'q bo'lib qoldi!
                        Qo'rqib ketdingiz, va <span class="highlite">MASHINA</span> tomonga yugurdingiz...
                        `,
            };

            GAME.addAndUpdate(obj);
            GAME.HIDDEN = true;
            GAME.STATE = "MASHINA";
        },
        // lMavjudot
        () => {
            const obj = {
                ...epz1,
                msg:
                    GAME.STATE === "MAVJUDOT"
                        ? `Siz <span class="highlite">MAVJUDOT</span>ga qaradingiz. Uning ho'rsillab nafas olishi sizni cho'chitardi...`
                        : GAME.HIDDEN
                        ? `Menimcha u go'yib bo'ldi. U yerdan tezroq ketishingiz kerak.`
                        : `Siz <span class="highlite">MAVJUDOT</span>ga qaradingiz. Menimcha unga yordam kerak...`,
            };

            GAME.addAndUpdate(obj);
        },
        // TOUCH
        () => {
            const obj = {
                ...epz1,
                msg: "Iltimos, joy nomini kiriting, misol: <span class='command'>TOUCH MASHINA</span>",
            };

            GAME.addAndUpdate(obj);
        },
        // tMashina
        () => {
            const obj = {
                ...epz1,
                msg:
                    GAME.STATE === "MASHINA"
                        ? `Siz <span class="highlite">MASHINA</span>ni ushladingiz. Sovuq...`
                        : `<span class="highlite">MASHINA</span> bu yerdan ancha uzoq...
                        `,
            };

            GAME.addAndUpdate(obj);
        },
        // tMavjudot
        () => {
            const obj = {
                ...epz1,
                msg:
                    GAME.STATE === "MAVJUDOT"
                        ? `Qo'rquv...`
                        : GAME.HIDDEN
                        ? `Menimcha u go'yib bo'ldi. U yerdan tezroq ketishingiz kerak.`
                        : `<span class="highlite">MAVJUDOT</span> bu yerdan ancha uzoq...`,
            };
            GAME.addAndUpdate(obj);
        },
        // GET OUT
        () => {
            const obj = {
                ...epz1,
                msg:
                    GAME.STATE !== "MASHINA"
                        ? `Avval <span class="highlite">MASHINA</span> yoniga borishingiz kerak...`
                        : `Siz <span class="highlite">MASHINA</span>ni o't oldirib, u yerdan ketdingiz...
                Afsus, sizning hikoyangizga hech kim ishonmaydi..
                <br>`,
            };
            GAME.addAndUpdate(obj);
            if (GAME.STATE === "MASHINA") {
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

const GAME = {
    currentEpisode: null,
    STATE: "MASHINA",
    HIDDEN: false,
    clicked: false,
    keyboardHistory: [],
    snippets: {
        freeSnippet: "Uzr, bu bo'lim hozircha bo'sh :(",
        chooseEpz: `Hikoyalardan birini tanlang <span style='font-style: italic'>(raqam bilan)</span>:
            <p class="opt"><span class="auto">[1]</span> Annabel #Episode_1 (test)</p>
            <p class="opt"><span class="auto">[2]</span> Blank</p>
            <p class="opt"><span class="auto">[3]</span> Blank</p>
            <p class="opt"><span class="auto">[4]</span> Blank</p>
            <p class="opt"><span class="auto">[5]</span> Yordam</p>
            <p class="opt"><span class="auto">[6]</span> Haqida</p>
            <p class="opt"><span class="auto">[7]</span> CLEAR</p>
            `,
        aboutSection: `
                        <p>Dasturlovchi: Humoyun</p>
                        <p>Hikoya: Madaminov Muhammadjon</p>
                        <p style="font-style: italic">Har bir epizod real hayotga asoslangan.</p>
                        `,
        generalHelp:
            "Har bir epizod uchun alohida buyruqlar ro'yhati mavjud. Olish uchun, avval biror epizodni tanlab 'yordam' buyrug'ini bering.",
        epz1: {
            helpString: ``,
        },
    },
    episodes: [epz1],
    copyFunc() {
        let inp = document.createElement("input");
        inp.value = _text;
        inp.select();
        document.execCommand("copy", true);
    },
    scrollToBottom(id) {
        const element = document.getElementById(id);
        element.scrollTop = element.scrollHeight;
    },
    addAndUpdate(_obj) {
        M.push(_obj);
        manipulateLast($("#messages"));
    },
    progressControl(_id, _label) {
        let i = 0;
        if (i == 0) {
            i = 1;
            let elem = document.getElementById(_id);
            let label = document.getElementById(_label);
            let width = 1;
            let id = setInterval(frame, 100);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    document.querySelector("#pbar").style.display = "none";
                    i = 0;
                } else {
                    width++;
                    elem.style.width = width + "%";
                    label.textContent = width + "%";
                }
            }
        }
    },
};

setInterval(() => {
    design("#container", {
        backgroundImage: "url('../res/unload.gif')",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    });
    setTimeout(() => {
        document.getElementById("container").style.backgroundImage = "";
    }, Math.random() * (2500 - 1000) + 1000);
}, 1000 * 60);

GAME.prototypes = [];

GAME.prototypes.copyFunc = () => {
    let inp = document.createElement("input");
    inp.value = _text;
    inp.select();
    document.execCommand("copy", true);
};

GAME.progressControl("white", "label");

const M = [
    {
        type: "bot",
        msg: GAME.snippets.chooseEpz,
        responses: ["1", "2", "3", "4", "5", "6", "7"],
        exec: [
            /* EPISODE 1, TEST */
            () => {
                const obj = {
                    type: "bot",
                    ...epz1,
                    error: "Noma'lum buyruq...",
                };
                GAME.addAndUpdate(obj);
            },
            /* EPISODE 2, TEST */
            () => {
                const obj = {
                    ...M[0],
                    msg: GAME.snippets.freeSnippet,
                };
                GAME.addAndUpdate(obj);
            },
            /* EPISODE 3, TEST */
            () => {
                const obj = {
                    ...M[0],
                    msg: GAME.snippets.freeSnippet,
                };
                GAME.addAndUpdate(obj);
            },
            /* EPISODE 4, TEST */
            () => {
                const obj = {
                    ...M[0],
                    msg: GAME.snippets.freeSnippet,
                };
                GAME.addAndUpdate(obj);
            },
            /* HELP */
            () => {
                const obj = {
                    ...M[0],
                    msg: GAME.snippets.generalHelp,
                };
                GAME.addAndUpdate(obj);
            },
            /* ABOUT */
            () => {
                const obj = {
                    ...M[0],
                    msg: GAME.snippets.aboutSection,
                };
                GAME.addAndUpdate(obj);
            },
            /* RESET */
            () => {
                $("#messages").innerHTML = "";
                manipulateLast($("#messages"));
            },
        ],
        error: GAME.snippets.chooseEpz,
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
        init();
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
                GAME.keyboardHistory.push(_e.target.value);
                addArray(M, _e.target.value, "user");
                _e.target.value = "";
                GAME.scrollToBottom("container");
            }
        },
        adv: {
            ev(target) {
                target.focus();
            },
        },
    },
});

// MUSIC
const music = new Audio();
music.src = "../res/bg.mp3";
music.volume = 0.1;

let index = -1;
window.addEventListener("keydown", function (_e) {
    if (!GAME.clicked) {
        music.play();
    }
    GAME.clicked = true;
    switch (_e.key) {
        case "ArrowUp":
            ++index > GAME.keyboardHistory.length - 1
                ? (index = GAME.keyboardHistory.length - 1)
                : index;
            document.querySelector("#user-input").value =
                GAME.keyboardHistory[index];
            break;
        case "ArrowDown":
            --index < 0 ? (index = 0) : index;
            document.querySelector("#user-input").value =
                GAME.keyboardHistory[index];
            break;
    }
});

window.addEventListener("contextmenu", function (_e) {
    _e.preventDefault();
});

init();
function init() {
    document.querySelectorAll(".auto").forEach((_el) => {
        _el.onclick = (_) => {
            let el = document.querySelector("#user-input");
            el.value = _.target.textContent.replace(/[\[\]]/g, "");
            el.focus();
        };
    });
}
