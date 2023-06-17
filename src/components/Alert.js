import React from "react";

export default function Alert(props) {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error"
        }
        const lower = word.toLowerCase()
        return lower.charAt(0).toLowerCase() + lower.slice(1)
    }
    return (
        <div style={{ height: '40px' }}>
            {props.Alert && <div
                className={`alert alert-${props.Alert.type} alert - dismissible fade show`}
                role="alert">
                <strong>{capitalize(props.Alert.type)} </strong>:{props.Alert.msg}
            </div>}
        </div>
    );
}