"use client";

// Components
import TextTitle from "@/components/atoms/TextTitle";
import Table from "@/components/molecules/Table/Table.jsx";
import Card from "@/components/molecules/Card";

// Styles
import classes from "./styles.module.css";

import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            window.location.href = "/login";
        }
    }, []);

    return (
        <div className={classes["container"]}>
            <TextTitle>Seguimiento de Procesos</TextTitle>
            <Card>
                <Table />
            </Card>
        </div>
    );
};
export default Home;
