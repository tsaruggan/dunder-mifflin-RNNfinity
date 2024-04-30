import React, { useState, useEffect } from 'react'
const prefixes = ["One moment please","Hold on","Wait","Loading","Just a second","Almost ready","Bare with us","Stay tuned","Any minute now","Finishing up"];
const suffixes = ["it's Pretzel Day","in a conference room meeting","trapped in an oil painting","on a sales call","this is a very important client","Ryan started the fire (again)","that's what she said","visiting Meredith at the hospital","at Pam's art show","Kevin spilled the chilli","petting Angela's cat","cleaning Creed's dentures","rubbing Stanley's neck","Michael fell in the Koi pond","starting a new paper company","the Scranton Strangler escaped","harvesting Dwight's beets","Kelly is crying (again)","Toby is the Scranton Strangler","emergency Party Planning Committee meeting"];

function Loading({ loading }) {

    const [text, setText] = useState("");

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                let prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                let suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
                setText(prefix + "..." + suffix + ".");
            }, 900);
            return () => clearInterval(interval);
        }

    }, [loading])

    if (loading) {
        return (<p id="loadingp">{text}</p>)
    } else {
        return (<></>)
    }
}

export default Loading