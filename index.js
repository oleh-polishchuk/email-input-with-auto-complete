import "./style.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";

const EmailInputWithAutoComplete = ({ domains }) => {
    const [ email, setEmail ] = useState("");
    const [ suggestion, setSuggestion ] = useState([]);

    const getSuggestion = email => {
        let emailParts = email.split("@");
        if (emailParts.length <= 1) {
            return [];
        }

        const userDomain = [ ...emailParts ].pop();
        if (!userDomain.length) {
            return [];
        }

        const userName = [ ...emailParts ].shift();
        return domains
            .filter(domain => domain !== userDomain && domain.includes(userDomain))
            .map(domain => `${userName}@${domain}`);
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        const suggestion = email && email.length > 3
            ? getSuggestion(email)
            : [];

        setEmail(email);
        setSuggestion(suggestion);
    };

    const handleSuggestionClick = suggestedEmail => {
        setEmail(suggestedEmail);
        setSuggestion([]);
    };

    return (
        <section styleName="email-auto-complete">
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="off"
            />
            <div styleName="email-auto-complete__dropdown">
                <ul styleName="dropdown">
                    {suggestion && suggestion.map((suggestedEmail, index) => (
                        <li
                            key={index}
                            styleName="dropdown__item"
                            onClick={() => handleSuggestionClick(suggestedEmail)}
                        >
                            {suggestedEmail}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

EmailInputWithAutoComplete.defaultProps = {
    domains: [
        "yahoo.com", "hotmail.com", "gmail.com", "me.com", "aol.com", "mac.com", "live.com", "comcast.net",
        "googlemail.com", "msn.com", "hotmail.co.uk", "yahoo.co.uk", "facebook.com", "verizon.net", "sbcglobal.net",
        "att.net", "gmx.com", "outlook.com", "icloud.com",
    ]
};

EmailInputWithAutoComplete.propTypes = {
    domains: PropTypes.arrayOf(PropTypes.string),
};

export default EmailInputWithAutoComplete;
