const main = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
}

const h1Style = {
    fontFamily: "var(--font-alfa-slab-one)",
    fontSize: "200px",
    fontWeight: "400",
    lineHeight: "240px",
    color: "#6E98A2FF",
    margin: "0",
}

const pStyle = {
    fontFamily: "var(--font-manrope)", /* Body */
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "28px",
    color: "#171A1FFF", /* neutral-900 */
    position: "relative",
    bottom: "30px",
}

export default function FourOhFour() {
    return (
        <>
            <main style={main}>
                <h1 style={h1Style}>404</h1>
                <p style={pStyle}>Кажется такой страницы не существует.</p>
            </main>
        </>
    );
}