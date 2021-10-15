import React, { useEffect, useState } from "react";
import "codemirror/lib/codemirror.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "./Editor.scss";

const themes = [
    "twilight",
    "night",
    "dracula",
    "material",
    "material-palenight",
    "material-ocean",
    "material-darker",
    "paraiso-light",
    "base16-light",
    "duotone-light",
];

themes.forEach((theme) => {
    require(`codemirror/theme/${theme}.css`);
});

function Editor(props) {
    const [theme, setTheme] = useState("twilight");
    const { name, value, onChange, language } = props;
    require(`codemirror/addon/hint/${language}-hint`);
    require(`codemirror/mode/${language}/${language}`);

    const handleChange = (editor, data, value) => {
        onChange(value);
    };

    return (
        <div className="editor-container">
            <div className="header-editor">
                <span>{name}</span>
                <div className="select-group" style={{ width: "200px" }}>
                    <select
                        className="select-theme"
                        value={themes[theme]}
                        onChange={(e) => {
                            setTheme(e.target.value.toLowerCase());
                        }}
                        style={{ width: "200px" }}
                    >
                        {themes.map((e) => (
                            <option key={e} value={e}>
                                {e.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <CodeMirror
                value={value}
                onBeforeChange={handleChange}
                options={{
                    lineWrapping: true,
                    mode: language,
                    theme: theme !== undefined ? theme : "dracula",
                    lineNumbers: true,
                    extraKeys: { "Ctrl-Space": "autocomplete" },
                }}
            />
        </div>
    );
}

export default Editor;
