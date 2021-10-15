import { useEffect, useState } from "react";
import "./App.scss";
import Editor from "./components/Editor";
import { template } from "./components/template";

function App() {
    const [html, setHtml] = useState(template[1].value);
    const [js, setJS] = useState(template[0].value);
    const [css, setCss] = useState(template[2].value);
    const [srcDoc, setSrcDoc] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <script>${js}</script>
                    <style>${css}</style>
                </html>
            `);
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, js, css]);

    return (
        <div className="App">
            <div className="editor-group">
                <Editor
                    name="HTML"
                    value={html}
                    onChange={setHtml}
                    language="xml"
                />
                <Editor
                    name="JS"
                    value={js}
                    onChange={setJS}
                    language="javascript"
                />
                <Editor
                    name="CSS"
                    value={css}
                    onChange={setCss}
                    language="css"
                />
            </div>
            <iframe
                className="output"
                title="editor"
                sandbox="allow-scripts"
                srcDoc={srcDoc}
            />
        </div>
    );
}

export default App;
