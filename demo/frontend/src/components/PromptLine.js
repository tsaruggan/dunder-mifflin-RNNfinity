import React from 'react'
import Select from 'react-select/creatable';
import { useState } from 'react'

const characters = [
    {
        "value": "A.J",
        "label": "A.J"
    },
    {
        "value": "ANDY",
        "label": "ANDY"
    },
    {
        "value": "ANDY'S FATHER",
        "label": "ANDY'S FATHER"
    },
    {
        "value": "ANDY'S MOTHER",
        "label": "ANDY'S MOTHER"
    },
    {
        "value": "ANGELA",
        "label": "ANGELA"
    },
    {
        "value": "ASIAN JIM",
        "label": "ASIAN JIM"
    },
    {
        "value": "ASTRID",
        "label": "ASTRID"
    },
    {
        "value": "AUNT SHIRLEY",
        "label": "AUNT SHIRLEY"
    },
    {
        "value": "BARTENDER",
        "label": "BARTENDER"
    },
    {
        "value": "BEN FRANKLIN",
        "label": "BEN FRANKLIN"
    },
    {
        "value": "BOB VANCE, VANCE REFRIGERATION",
        "label": "BOB VANCE, VANCE REFRIGERATION"
    },
    {
        "value": "BRANDON",
        "label": "BRANDON"
    },
    {
        "value": "BRENDA",
        "label": "BRENDA"
    },
    {
        "value": "BRIAN",
        "label": "BRIAN"
    },
    {
        "value": "BROCCOLI ROB",
        "label": "BROCCOLI ROB"
    },
    {
        "value": "CPR TRAINER",
        "label": "CPR TRAINER"
    },
    {
        "value": "CAPTAIN JACK",
        "label": "CAPTAIN JACK"
    },
    {
        "value": "CARLA FERN",
        "label": "CARLA FERN"
    },
    {
        "value": "CAROL",
        "label": "CAROL"
    },
    {
        "value": "CASEY DEAN",
        "label": "CASEY DEAN"
    },
    {
        "value": "CATHY",
        "label": "CATHY"
    },
    {
        "value": "CECE",
        "label": "CECE"
    },
    {
        "value": "CHARLES MINER",
        "label": "CHARLES MINER"
    },
    {
        "value": "CHEF",
        "label": "CHEF"
    },
    {
        "value": "CHILD",
        "label": "CHILD"
    },
    {
        "value": "CHRISTIAN",
        "label": "CHRISTIAN"
    },
    {
        "value": "CHURCHGOER",
        "label": "CHURCHGOER"
    },
    {
        "value": "CINDY",
        "label": "CINDY"
    },
    {
        "value": "CLARK",
        "label": "CLARK"
    },
    {
        "value": "CLEANING LADY",
        "label": "CLEANING LADY"
    },
    {
        "value": "CLIENT",
        "label": "CLIENT"
    },
    {
        "value": "COMPUTER",
        "label": "COMPUTER"
    },
    {
        "value": "COMPUTRON",
        "label": "COMPUTRON"
    },
    {
        "value": "CONCIERGE MARIE",
        "label": "CONCIERGE MARIE"
    },
    {
        "value": "COOKIE MONSTER",
        "label": "COOKIE MONSTER"
    },
    {
        "value": "CORPORATE",
        "label": "CORPORATE"
    },
    {
        "value": "CREED",
        "label": "CREED"
    },
    {
        "value": "CREW",
        "label": "CREW"
    },
    {
        "value": "DANNY CORDRAY",
        "label": "DANNY CORDRAY"
    },
    {
        "value": "DARRYL",
        "label": "DARRYL"
    },
    {
        "value": "DARRYL'S SISTER",
        "label": "DARRYL'S SISTER"
    },
    {
        "value": "DAVID BRENT",
        "label": "DAVID BRENT"
    },
    {
        "value": "DAVID WALLACE",
        "label": "DAVID WALLACE"
    },
    {
        "value": "DEANGELO VICKERS",
        "label": "DEANGELO VICKERS"
    },
    {
        "value": "DELIVERY MAN",
        "label": "DELIVERY MAN"
    },
    {
        "value": "DEVON",
        "label": "DEVON"
    },
    {
        "value": "DOCTOR",
        "label": "DOCTOR"
    },
    {
        "value": "DONNA",
        "label": "DONNA"
    },
    {
        "value": "DRIVER",
        "label": "DRIVER"
    },
    {
        "value": "DWIGHT",
        "label": "DWIGHT"
    },
    {
        "value": "DWIGHT'S BABYSITTER",
        "label": "DWIGHT'S BABYSITTER"
    },
    {
        "value": "ED TRUCK",
        "label": "ED TRUCK"
    },
    {
        "value": "EMPLOYEE",
        "label": "EMPLOYEE"
    },
    {
        "value": "ERIN",
        "label": "ERIN"
    },
    {
        "value": "ESTHER",
        "label": "ESTHER"
    },
    {
        "value": "FAKE STANLEY",
        "label": "FAKE STANLEY"
    },
    {
        "value": "FLIGHT ATTENDANT",
        "label": "FLIGHT ATTENDANT"
    },
    {
        "value": "GABE",
        "label": "GABE"
    },
    {
        "value": "GIL",
        "label": "GIL"
    },
    {
        "value": "GLENN",
        "label": "GLENN"
    },
    {
        "value": "HANK",
        "label": "HANK"
    },
    {
        "value": "HANNAH",
        "label": "HANNAH"
    },
    {
        "value": "HIDE",
        "label": "HIDE"
    },
    {
        "value": "HOLLY",
        "label": "HOLLY"
    },
    {
        "value": "HUNTER",
        "label": "HUNTER"
    },
    {
        "value": "IT GUY",
        "label": "IT GUY"
    },
    {
        "value": "INTERN",
        "label": "INTERN"
    },
    {
        "value": "IRENE",
        "label": "IRENE"
    },
    {
        "value": "ISABELLE",
        "label": "ISABELLE"
    },
    {
        "value": "JAN",
        "label": "JAN"
    },
    {
        "value": "JESSICA",
        "label": "JESSICA"
    },
    {
        "value": "JIM",
        "label": "JIM"
    },
    {
        "value": "JIM'S BROTHER",
        "label": "JIM'S BROTHER"
    },
    {
        "value": "JIM'S FATHER",
        "label": "JIM'S FATHER"
    },
    {
        "value": "JO BENNETT",
        "label": "JO BENNETT"
    },
    {
        "value": "JOSH",
        "label": "JOSH"
    },
    {
        "value": "KAREN",
        "label": "KAREN"
    },
    {
        "value": "KATY",
        "label": "KATY"
    },
    {
        "value": "KELLY",
        "label": "KELLY"
    },
    {
        "value": "KELLY'S FATHER",
        "label": "KELLY'S FATHER"
    },
    {
        "value": "KELLY'S MOTHER",
        "label": "KELLY'S MOTHER"
    },
    {
        "value": "KEVIN",
        "label": "KEVIN"
    },
    {
        "value": "LAWYER",
        "label": "LAWYER"
    },
    {
        "value": "LONNY",
        "label": "LONNY"
    },
    {
        "value": "LUKE",
        "label": "LUKE"
    },
    {
        "value": "LYNN",
        "label": "LYNN"
    },
    {
        "value": "MADGE",
        "label": "MADGE"
    },
    {
        "value": "MAGICIAN",
        "label": "MAGICIAN"
    },
    {
        "value": "MARTIN",
        "label": "MARTIN"
    },
    {
        "value": "MATT",
        "label": "MATT"
    },
    {
        "value": "MEREDITH",
        "label": "MEREDITH"
    },
    {
        "value": "MICHAEL",
        "label": "MICHAEL"
    },
    {
        "value": "MOSE",
        "label": "MOSE"
    },
    {
        "value": "MR. BROWN",
        "label": "MR. BROWN"
    },
    {
        "value": "MR. FIGARO",
        "label": "MR. FIGARO"
    },
    {
        "value": "MR. O'MALLEY",
        "label": "MR. O'MALLEY"
    },
    {
        "value": "MR. RAMISH",
        "label": "MR. RAMISH"
    },
    {
        "value": "MR. ROMANKO",
        "label": "MR. ROMANKO"
    },
    {
        "value": "MR. RUGER",
        "label": "MR. RUGER"
    },
    {
        "value": "MR. SCHOFIELD",
        "label": "MR. SCHOFIELD"
    },
    {
        "value": "MRS. DAVIS",
        "label": "MRS. DAVIS"
    },
    {
        "value": "MRS. WALLACE",
        "label": "MRS. WALLACE"
    },
    {
        "value": "NANA",
        "label": "NANA"
    },
    {
        "value": "NATE",
        "label": "NATE"
    },
    {
        "value": "NELLIE",
        "label": "NELLIE"
    },
    {
        "value": "NURSE",
        "label": "NURSE"
    },
    {
        "value": "OSCAR",
        "label": "OSCAR"
    },
    {
        "value": "PACKER",
        "label": "PACKER"
    },
    {
        "value": "PAM",
        "label": "PAM"
    },
    {
        "value": "PAM'S FATHER",
        "label": "PAM'S FATHER"
    },
    {
        "value": "PAM'S GRANDMOTHER",
        "label": "PAM'S GRANDMOTHER"
    },
    {
        "value": "PAM'S MOTHER",
        "label": "PAM'S MOTHER"
    },
    {
        "value": "PHILLIP",
        "label": "PHILLIP"
    },
    {
        "value": "PHYLLIS",
        "label": "PHYLLIS"
    },
    {
        "value": "POLICE OFFICER",
        "label": "POLICE OFFICER"
    },
    {
        "value": "PRINCE FAMILY PAPER",
        "label": "PRINCE FAMILY PAPER"
    },
    {
        "value": "RAVI",
        "label": "RAVI"
    },
    {
        "value": "REPORTER",
        "label": "REPORTER"
    },
    {
        "value": "ROBERT CALIFORNIA",
        "label": "ROBERT CALIFORNIA"
    },
    {
        "value": "ROLF",
        "label": "ROLF"
    },
    {
        "value": "ROY",
        "label": "ROY"
    },
    {
        "value": "RYAN",
        "label": "RYAN"
    },
    {
        "value": "SALESMAN",
        "label": "SALESMAN"
    },
    {
        "value": "SCRANTON STRANGLER",
        "label": "SCRANTON STRANGLER"
    },
    {
        "value": "SECRETARY",
        "label": "SECRETARY"
    },
    {
        "value": "SECURITY",
        "label": "SECURITY"
    },
    {
        "value": "SENATOR LIPTON",
        "label": "SENATOR LIPTON"
    },
    {
        "value": "SPEAKERPHONE",
        "label": "SPEAKERPHONE"
    },
    {
        "value": "STANLEY",
        "label": "STANLEY"
    },
    {
        "value": "STRIPPER",
        "label": "STRIPPER"
    },
    {
        "value": "STUDENT",
        "label": "STUDENT"
    },
    {
        "value": "TEACHER",
        "label": "TEACHER"
    },
    {
        "value": "TOBY",
        "label": "TOBY"
    },
    {
        "value": "TROY",
        "label": "TROY"
    },
    {
        "value": "VAL",
        "label": "VAL"
    },
    {
        "value": "VIKRAM",
        "label": "VIKRAM"
    },
    {
        "value": "W.B. JONES",
        "label": "W.B. JONES"
    },
    {
        "value": "WAITRESS",
        "label": "WAITRESS"
    },
    {
        "value": "WOLF",
        "label": "WOLF"
    },
    {
        "value": "ZEKE",
        "label": "ZEKE"
    }
];
function PromptLine({ index, prompt, onChange }) {
    const [character, setCharacter] = useState(prompt.character);
    const [line, setLine] = useState(prompt.line);

    const handleCharacterChange = (e) => {
        setCharacter(e.value)
        onChange(index, { character: e.value, line: line })
    }
    const handleLineChange = (e) => {
        setLine(e.target.value)
        onChange(index, { character: character, line: e.target.value })
    }

    const handleFocus = (e) => e.target.select();

    const styles = {
        singleValue: (base, state) => ({
            ...base,
            color: state.selectProps.menuIsOpen ? '#A9A9A9' : base.color,

        }),
    }

    return (
        <>
            <div className="prompt-line">
                <div style={{ width: '300px' }}>
                    <Select  options={characters} defaultValue={{ "value": character, "label": character }} onChange={handleCharacterChange} styles={styles} />
                </div>
                <input type="text" className="line" defaultValue={line} onChange={handleLineChange} onFocus={handleFocus}></input>
            </div>
        </>
    )
}

export default PromptLine