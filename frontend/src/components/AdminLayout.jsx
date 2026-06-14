import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout({
    perfil,
    children
}) {

    return (

        <>
            <Header />

            <div
                style={{
                    display:"flex",
                    minHeight:"100vh"
                }}
            >

                <Sidebar
                    perfil={perfil}
                />

                <main
                    style={{
                        flex:1,
                        padding:"30px"
                    }}
                >
                    {children}
                </main>

            </div>
        </>

    );
}